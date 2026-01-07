import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getTokenPayload } from "@/app/api/utils/auth";
import { generateToken } from "@/app/utils/generateToken";
import * as Sentry from "@sentry/nextjs";
import nodemailer from "nodemailer";

/**
 * POST /api/send-welcome-email
 * Body: { userId }
 * Rotates the passwordRefreshToken and sends a welcome email via Nodemailer+Gmail.
 */
export async function POST(req: NextRequest) {
  try {
    Sentry.logger.info("[send-welcome-email] POST handler invoked");
    const { userId } = await req.json();
    Sentry.logger.debug("[send-welcome-email] Input", { userId });

    if (!userId) {
      Sentry.logger.error("[send-welcome-email] Missing userId in request");
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    // Enforce admin authentication
    const tokenPayload = getTokenPayload(req);
    Sentry.logger.debug("[send-welcome-email] Auth payload", { tokenPayload });
    if (!tokenPayload || tokenPayload.role !== "admin") {
      Sentry.logger.error("[send-welcome-email] Unauthorized access", { tokenPayload });
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Generate a new refresh token
    const newToken = generateToken();
    Sentry.logger.debug("[send-welcome-email] Generated passwordRefreshToken", { newToken });

    // Update user and get current info (firstName, email, etc.)
    const user = await prisma.user.update({
      where: { id: userId },
      data: { passwordRefreshToken: newToken },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        username: true,
        passwordRefreshToken: true,
        sex: true,
      }
    });
    Sentry.logger.debug("[send-welcome-email] User info after update", { user });

    if (!user) {
      Sentry.logger.error("[send-welcome-email] User not found after update", { userId });
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    if (!user.email) {
      Sentry.logger.error("[send-welcome-email] User has no email", { userId, user });
      return NextResponse.json({ error: "User has no email" }, { status: 400 });
    }

    // Build link and email parameters
    const baseUrl = process.env.BASE_URL || "http://localhost:3000";
    const generatePasswordLink = `${baseUrl}/create-password/${user.passwordRefreshToken}`;

    // Gmail credentials via env, using Google's recommended App Password flow.
    const gmailUser = process.env.GMAIL_USER;
    const gmailAppPassword = process.env.GOOGLE_APP_PASSWORD; // 16-character App Password
    Sentry.logger.debug("[send-welcome-email] Gmail config", { user: !!gmailUser, appPass: !!gmailAppPassword });

    if (!gmailUser || !gmailAppPassword) {
      Sentry.logger.error("[send-welcome-email] Missing GMAIL_USER/GOOGLE_APP_PASSWORD env vars (required for Nodemailer+Gmail 2FA)");
      return NextResponse.json({ error: "Gmail credentials missing in environment (GMAIL_USER, GOOGLE_APP_PASSWORD required)" }, { status: 500 });
    }

    // Nodemailer transport using Google's App Password authentication
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailAppPassword // The 16-character App Password (not your Google password)
      }
    });

    // Pick the correct Spanish greeting
    const bienvenida =
      user.sex === "FEMALE" ? "Bienvenida" : "Bienvenido";

    // Email contents
    const mailOptions = {
      from: `"Elena Benet" <${gmailUser}>`,
      to: user.email,
      subject: `${bienvenida} a Elena Benet – genera tu contraseña`,
      text: `Hola ${user.firstName || user.username || ""},

${bienvenida} a la plataforma de entrenamiento de Elena Benet.

Haz clic en el siguiente enlace para generar tu contraseña y acceder a la plataforma:
${generatePasswordLink}

Si tienes dudas, responde a este email.

Un saludo,
El equipo de Elena Benet
`,
      html: `
<style>
  a {
    color: #f5f5f5;
  }
</style>
<div
  style="
    font-family: system-ui, sans-serif, Arial;
    font-size: 14px;
    color: #333;
    padding: 20px 14px;
    background-color: #f5f5f5;
  "
>
  <div style="max-width: 600px; margin: auto; background-color: #333; color: #cccccc">
    <div style="text-align: center; background-color: #333; padding: 14px">
      <a style="text-decoration: none; outline: none" href="https://trainn-hazel.vercel.app" target="_blank">
        <img
          style="height: 125px; vertical-align: middle"
          src="https://app.elenabenet.com/elena_logo.png"
          alt="logo"
        />
      </a>
    </div>
    <div style="padding: 14px">
      <h1 style="font-size: 22px; margin-bottom: 26px">¡${bienvenida}, ${user.firstName || user.username || ""}!</h1>
      <p>
        Te he creado un usuario para mi plataforma. Desde ella podrás registrar tu entrenamiento, ver tus bloques de ejercicios, seguir tu progreso y mucho más.
      </p>
      <p>
        Tu nombre de usuario es <b>${user.username}</b>.
      </p>
      <p>
        Puedes crear tu contraseña <a href="${generatePasswordLink}">aquí</a>.
      </p>
      <p>
        <a href="https://app.elenabenet.com">Accede a la plataforma aquí</a>.
      </p>
    </div>
  </div>
  <div style="max-width: 600px; margin: auto">
    <p style="color: #999">
      Has recibido este email porque te has registrado como atleta en la plataforma de Elena Benet. Puedes ejercer tus derechos reconocidos en la LODP mandándome <a style="color: #999" href="mailto:elenaalonsobeneyto8@gmail.com">un correo</a> y te atenderé lo antes posible. 
    </p>
  </div>
</div>
      `
    };

    try {
      const emailRes = await transporter.sendMail(mailOptions);
      Sentry.logger.info("[send-welcome-email] Email sent to user", { userId, email: user.email, messageId: emailRes.messageId });
    } catch (sendErr) {
      Sentry.logger.error("[send-welcome-email] Nodemailer send failure", { userId, email: user.email, sendErr });
      return NextResponse.json({ error: "Failed to send email (Nodemailer)" }, { status: 500 });
    }

    Sentry.logger.info("[send-welcome-email] Welcome email process finished", { userId, result: "ok" });
    return NextResponse.json({ ok: true });

  } catch (error) {
    Sentry.logger.error("[send-welcome-email] Exception thrown", { error });
    return NextResponse.json({ error: "Failed to send welcome email" }, { status: 500 });
  }
}
