import React from "react";
import { Paper, Typography } from "@mui/material";

type Props = {
  athleteName: string;
  data: any;
  formatDate: (dateStr?: string) => string;
};

export default function AthleteReportPDFContent({ athleteName, data, formatDate }: Props) {
  return (
    <Paper style={{ padding: 24, backgroundColor: "#fff" }}>
      <Typography variant="h5" align="center" gutterBottom>
        {athleteName} - Athlete Report
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Personal Information
      </Typography>
      <ul>
        <li>First Name: {data?.user?.firstName}</li>
        <li>Last Name: {data?.user?.lastName}</li>
        <li>Username: {data?.user?.username}</li>
        <li>Email: {data?.user?.email}</li>
        <li>Sex: {data?.user?.sex}</li>
        <li>Created at: {formatDate(data?.user?.createdAt)}</li>
        <li>Subscription: {data?.user?.subscriptionAmount ? `${data.user.subscriptionAmount} (${data.user.subscriptionFrequency})` : "-"}</li>
      </ul>
      <Typography variant="subtitle1" gutterBottom style={{ marginTop: 16 }}>
        Blocks Summary
      </Typography>
      {Array.isArray(data?.blocks) && data.blocks.length > 0 ? (
        <ul>
          {data.blocks.map((b: any, idx: number) => (
            <li key={idx}>
              Block {idx + 1} ({formatDate(b.createdAt)}), Weeks: {b.weeksCount}
              <br />
              Muscle Groups: {Array.isArray(b.muscleGroups) ? b.muscleGroups.join(", ") : "-"}
            </li>
          ))}
        </ul>
      ) : (
        <Typography>No blocks registered.</Typography>
      )}
      <Typography variant="subtitle1" gutterBottom style={{ marginTop: 16 }}>
        Payments
      </Typography>
      {Array.isArray(data?.payments) && data.payments.length > 0 ? (
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 8 }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #aaa", padding: 4 }}>Amount</th>
              <th style={{ border: "1px solid #aaa", padding: 4 }}>Due</th>
              <th style={{ border: "1px solid #aaa", padding: 4 }}>Paid</th>
              <th style={{ border: "1px solid #aaa", padding: 4 }}>Status</th>
              <th style={{ border: "1px solid #aaa", padding: 4 }}>Description</th>
            </tr>
          </thead>
          <tbody>
            {data.payments.map((p: any, idx: number) => (
              <tr key={idx}>
                <td style={{ border: "1px solid #aaa", padding: 4 }}>{p.amount ?? "-"}</td>
                <td style={{ border: "1px solid #aaa", padding: 4 }}>{formatDate(p.dueDate)}</td>
                <td style={{ border: "1px solid #aaa", padding: 4 }}>{p.paidDate ? formatDate(p.paidDate) : "-"}</td>
                <td style={{ border: "1px solid #aaa", padding: 4 }}>{p.isPaid ? "Paid" : "Pending"}</td>
                <td style={{ border: "1px solid #aaa", padding: 4 }}>{p.description || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Typography>No payments found.</Typography>
      )}
      <Typography variant="subtitle1" gutterBottom style={{ marginTop: 16 }}>
        Measurements
      </Typography>
      {Array.isArray(data?.measurements) && data.measurements.length > 0 ? (
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 8 }}>
          <thead>
            <tr>
              {Object.keys(data.measurements[0])
                .filter((k) => !["id", "userId"].includes(k))
                .map((col) => (
                  <th key={col} style={{ border: "1px solid #aaa", padding: 4 }}>
                    {col.charAt(0).toUpperCase() + col.slice(1)}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {data.measurements.slice(0, 5).map((m: any, idx: number) => (
              <tr key={idx}>
                {Object.keys(m)
                  .filter((k) => !["id", "userId"].includes(k))
                  .map((col) => (
                    <td key={col} style={{ border: "1px solid #aaa", padding: 4 }}>
                      {col.toLowerCase().includes("date")
                        ? formatDate(m[col])
                        : m[col] ?? "-"}
                    </td>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Typography>No measurements found.</Typography>
      )}
    </Paper>
  );
}
