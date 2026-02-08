import React, { useRef } from "react";
import { usePDF, Margin } from "react-to-pdf";
import { Button, Paper, Typography } from "@mui/material";

// You may also import and use your own UI components for the report here

type Props = {
  userId: string;
  athleteName: string;
  hideButton?: boolean;
};

const fetchAthleteReport = async (userId: string) => {
  const res = await fetch(`/api/athlete-report?userId=${encodeURIComponent(userId)}`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch athlete report");
  return res.json();
};

function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
}

export default function AthleteReportPDFExport({ userId, athleteName, hideButton }: Props) {
  const { toPDF, targetRef } = usePDF({
    filename: `${athleteName}_athlete_report.pdf`,
    page: { margin: Margin.MEDIUM, orientation: "portrait" },
  });

  const [data, setData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    setLoading(true);
    fetchAthleteReport(userId)
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message || "Failed to load report data");
        setLoading(false);
      });
  }, [userId]);

  return (
    <div>
      {!hideButton && (
        <Button variant="contained" color="primary" onClick={() => toPDF()} style={{ marginBottom: 16 }}>
          Download Athlete PDF
        </Button>
      )}
      {loading ? (
        <Typography>Loading report data...</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <div ref={targetRef}>
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
            {/* You can add React chart components or custom visuals here for full fidelity export */}
          </Paper>
        </div>
      )}
    </div>
  );
}
