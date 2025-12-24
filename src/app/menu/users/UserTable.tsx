"use client";
import React, { useState, useEffect } from "react";
import { translations, type Lang } from "../../i18n";
import ConfirmModal from "../../components/ConfirmModal";

function AthleteModal({
  user,
  lang,
  selectedTab,
  setSelectedTab,
  onClose,
  onUserUpdate,
}: {
  user: any;
  lang: Lang;
  selectedTab: "info" | "payments";
  setSelectedTab: (tab: "info" | "payments") => void;
  onClose: () => void;
  onUserUpdate: (user: any) => void;
}) {
  const [currentUser, setCurrentUser] = useState(user);
  const [confirmState, setConfirmState] = useState<{
    open: boolean;
    action: "pay" | "unpay" | "delete" | null;
    payment: any;
  }>({
    open: false,
    action: null,
    payment: null,
  });

  // Payment Pagination: 5 per page
  const paymentsPerPage = 5;
  const [paymentPage, setPaymentPage] = useState(1);
  const paymentsCount = Array.isArray(currentUser.payments) ? currentUser.payments.length : 0;
  const paymentsTotalPages = Math.max(1, Math.ceil(paymentsCount / paymentsPerPage));
  const paginatedPayments = Array.isArray(currentUser.payments)
    ? currentUser.payments.slice((paymentPage - 1) * paymentsPerPage, paymentPage * paymentsPerPage)
    : [];

  useEffect(() => {
    setPaymentPage(1);
  }, [currentUser.id]);

  function PaymentsPagination() {
    if (paymentsTotalPages <= 1) return null;
    return (
      <div className="flex justify-center mt-4 gap-2">
        <button
          className="px-2 py-1 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-100 hover:bg-zinc-300 dark:hover:bg-zinc-700 disabled:opacity-50"
          disabled={paymentPage === 1}
          onClick={() => setPaymentPage(paymentPage - 1)}
        >
          Prev
        </button>
        {[...Array(paymentsTotalPages)].map((_, idx) => (
          <button
            key={idx}
            className={`px-2 py-1 rounded ${paymentPage === idx + 1
              ? "bg-blue-600 text-white"
              : "bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800"
              }`}
            onClick={() => setPaymentPage(idx + 1)}
          >
            {idx + 1}
          </button>
        ))}
        <button
          className="px-2 py-1 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-100 hover:bg-zinc-300 dark:hover:bg-zinc-700 disabled:opacity-50"
          disabled={paymentPage === paymentsTotalPages}
          onClick={() => setPaymentPage(paymentPage + 1)}
        >
          Next
        </button>
      </div>
    );
  }

  // Add Payment section (button + modal/form logic)
  function AddPaymentSection() {
    const [open, setOpen] = useState(false);
    const [dueDate, setDueDate] = useState(""); // yyyy-mm-dd
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleAddPayment = async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);

      // Basic validation
      if (!dueDate || !amount || isNaN(Number(amount))) {
        setError(translations[lang].manageUsersAddPaymentInvalid ?? "Provide a valid date and amount.");
        return;
      }
      setLoading(true);

      // API: POST to /api/payment/[id] with { dueDate, amount }
      const res = await fetch(`/api/payment/${currentUser.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dueDate, amount: Number(amount) })
      });
      setLoading(false);

      if (res.ok) {
        // Refresh payments
        const userRes = await fetch(`/api/get-user-management-info/${currentUser.id}`);
        if (userRes.ok) {
          const updatedUser = await userRes.json();
          if (updatedUser && !updatedUser.error) {
            setCurrentUser(updatedUser);
            onUserUpdate(updatedUser);
            setOpen(false);
            setDueDate("");
            setAmount("");
            setPaymentPage(1);
          }
        }
      } else {
        setError(translations[lang].manageUsersAddPaymentFail ?? "Failed to create payment.");
      }
    };

    return (
      <div className="mb-2 flex flex-col items-start">
        <button
          onClick={() => setOpen(true)}
          className="mb-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
        >
          {translations[lang].manageUsersAddPayment ?? "+ Add Payment"}
        </button>
        {open && (
          <form
            onSubmit={handleAddPayment}
            className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded shadow w-full max-w-xs flex flex-col gap-2"
            style={{ zIndex: 10 }}
          >
            <label className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
              Due Date
              <input
                type="date"
                value={dueDate}
                onChange={e => setDueDate(e.target.value)}
                className="mt-1 block w-full rounded border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                required
              />
            </label>
            <label className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
              Amount
              <input
                type="number"
                step="0.01"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                className="mt-1 block w-full rounded border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                required
                min="0.01"
              />
            </label>
            {error && (
              <div className="text-red-600 text-xs">{error}</div>
            )}
            <div className="flex gap-2 mt-2">
              <button
                type="submit"
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded font-bold"
              >
                {loading
                  ? translations[lang].manageUsersAddPaymentAdding ?? "Adding..."
                  : translations[lang].manageUsersAddPaymentCreate ?? "Create"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setOpen(false); setError(null);
                }}
                className="bg-zinc-400 hover:bg-zinc-600 text-white px-3 py-1 rounded font-bold"
              >
                {translations[lang].manageUsersAddPaymentCancel ?? "Cancel"}
              </button>
            </div>
          </form>
        )}
      </div>
    );
  }

  // If the athlete ID changes, update modal content, but do not reset tab state
  React.useEffect(() => {
    if (user.id !== currentUser?.id) {
      setCurrentUser(user);
    }
    // else, ignore updates to user object for the same athlete
    // This preserves tab selection and prevents unneeded remounts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]);

  const handleConfirm = async () => {
    const { action, payment } = confirmState;
    if (!action || !payment) return;

    if (action === "pay") {
      await fetch(`/api/payment/${payment.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPayed: true }),
      });
    } else if (action === "unpay") {
      await fetch(`/api/payment/${payment.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPayed: false }),
      });
    } else if (action === "delete") {
      await fetch(`/api/payment/${payment.id}`, { method: "DELETE" });
    }

    // Only update internal modal state so UI updates but modal/tab remains.
    const res = await fetch(`/api/get-user-management-info/${currentUser.id}`);
    if (res.ok) {
      const updatedUser = await res.json();
      if (updatedUser && !updatedUser.error) setCurrentUser(updatedUser);
      if (updatedUser && !updatedUser.error) onUserUpdate(updatedUser);
    }
    setConfirmState({ open: false, action: null, payment: null });
  };

  if (!currentUser) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl p-8 relative max-w-lg w-full border border-zinc-200 dark:border-zinc-700"
        onClick={e => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 text-zinc-400 hover:text-zinc-900 dark:hover:text-white text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-300 flex items-center gap-2">
          👤 {translations[lang].manageUsersModalHeader}
        </h2>
        {/* Tabs */}
        <div className="flex mb-4 gap-2">
          <button
            className={`px-4 py-2 rounded-t-lg font-semibold ${selectedTab === "info"
              ? "bg-blue-600 text-white"
              : "bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-100"
            }`}
            onClick={() => setSelectedTab("info")}
          >
            {translations[lang].infoTab}
          </button>
          <button
            className={`px-4 py-2 rounded-t-lg font-semibold ${selectedTab === "payments"
              ? "bg-blue-600 text-white"
              : "bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-100"
            }`}
            onClick={() => setSelectedTab("payments")}
          >
            {translations[lang].paymentsTab}
          </button>
        </div>
        {selectedTab === "info" && (
          <dl className="text-lg md:text-xl text-zinc-800 dark:text-zinc-100 space-y-2">
            <div>
              <dt className="font-semibold text-blue-700 dark:text-blue-300">{translations[lang].manageUsersModalName}</dt>
              <dd>{user.name}</dd>
            </div>
            <div>
              <dt className="font-semibold text-blue-700 dark:text-blue-300">{translations[lang].manageUsersModalUsername ?? "Username"}</dt>
              <dd>{user.username ?? <span className="italic text-zinc-400">---</span>}</dd>
            </div>
            <div>
              <dt className="font-semibold text-blue-700 dark:text-blue-300">{translations[lang].manageUsersModalEmail ?? "Email"}</dt>
              <dd>{user.email ?? <span className="italic text-zinc-400">---</span>}</dd>
            </div>
            <div>
              <dt className="font-semibold text-blue-700 dark:text-blue-300">{translations[lang].manageUsersModalLastVisitedWeek}</dt>
              <dd>{user.lastVisitedWeek ?? <span className="italic text-zinc-400">---</span>}</dd>
            </div>
            <div>
              <dt className="font-semibold text-blue-700 dark:text-blue-300">{translations[lang].manageUsersModalRole}</dt>
              <dd>{user.role}</dd>
            </div>
          </dl>
        )}
        {selectedTab === "payments" && (
          <div className="overflow-x-auto">
            <AddPaymentSection />
            <table className="w-full mt-2 text-md text-zinc-800 dark:text-zinc-100">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-700">
                  <th className="px-3 py-2 text-left">{translations[lang].paymentsTableDate}</th>
                  <th className="px-3 py-2 text-left">{translations[lang].paymentsTableAmount}</th>
                  <th className="px-3 py-2 text-left">{translations[lang].paymentsTablePaid}</th>
                  <th className="px-3 py-2 text-left">{translations[lang].paymentsTableActions}</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(currentUser.payments) && currentUser.payments.length > 0 ? (
                  paginatedPayments.map((p: any) => (
                    <tr key={String(p.id)}>
                      <td className="px-3 py-2">
                        {new Date(p.dueDate).toLocaleDateString(lang === "es" ? "es-ES" : "en-GB")}
                      </td>
                      <td className="px-3 py-2">{typeof p.amount === "number" ? p.amount.toFixed(2) : p.amount}</td>
                      <td className="px-3 py-2">{p.isPayed ? "✅" : "❌"}</td>
                      <td className="px-3 py-2 flex gap-2">
                        <button
                          type="button"
                          title={translations[lang].actionsMarkPayedTooltip}
                          onClick={() =>
                            setConfirmState({
                              open: true,
                              action: "pay",
                              payment: p,
                            })
                          }
                          style={{ cursor: "pointer", fontSize: 18 }}
                        >
                          💶
                        </button>
                        <button
                          type="button"
                          title={translations[lang].actionsMarkUnpayedTooltip}
                          onClick={() =>
                            setConfirmState({
                              open: true,
                              action: "unpay",
                              payment: p,
                            })
                          }
                          style={{ cursor: "pointer", fontSize: 18 }}
                        >
                          💸
                        </button>
                        <button
                          type="button"
                          title={translations[lang].actionsRemovePaymentTooltip}
                          onClick={() =>
                            setConfirmState({
                              open: true,
                              action: "delete",
                              payment: p,
                            })
                          }
                          style={{ cursor: "pointer", fontSize: 18 }}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="px-3 py-2" colSpan={4}>
                      {translations[lang].manageUsersAddPaymentNone ?? "No payments found."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <PaymentsPagination />
          </div>
        )}
      </div>
      <ConfirmModal
        open={confirmState.open}
        title={
          confirmState.action === "pay"
            ? translations[lang].actionsMarkPayed
            : confirmState.action === "unpay"
            ? translations[lang].actionsMarkUnpayed
            : confirmState.action === "delete"
            ? translations[lang].actionsRemovePayment
            : "Are you sure?"
        }
        confirmLabel={translations[lang].actionsConfirmYes || "Yes"}
        cancelLabel={translations[lang].actionsConfirmNo || "No"}
        onConfirm={handleConfirm}
        onCancel={() => setConfirmState(s => ({ ...s, open: false }))}
      />
    </div>
  );
}

export default function UserTable({
  lang,
}: {
  lang: Lang;
}) {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<any | null>(null);
  const [athleteModalTab, setAthleteModalTab] = useState<"info" | "payments">("info");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  // Quick filter: "all" | "due" | "nofuture"
  const [quickFilter, setQuickFilter] = useState<"all" | "due" | "nofuture">("all");

  const rowsPerPage = 10;

  useEffect(() => {
    setLoading(true);
    fetch("/api/get-user-management-info")
      .then(r => r.json())
      .then(d => {
        setUsers(Array.isArray(d) ? d : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Localized search placeholder
  const searchPlaceholders: Record<string, string> = {
    en: "Search by name, username, or email",
    es: "Buscar por nombre, usuario o email",
  };
  const placeholder = searchPlaceholders[lang] ?? "Search...";

  // Only include user objects with role === "athlete"
  const athletes = users.filter((u: any) => u.role === "athlete");

  const filteredUsers = athletes.filter((u: any) => {
    const term = searchTerm.toLowerCase();
    const now = new Date();

    // At least one overdue/unpaid
    const hasOverdueUnpaid = Array.isArray(u.payments)
      ? u.payments.some((p: any) => !p.isPayed && new Date(p.dueDate) <= now)
      : false;

    // Has at least one future payment regardless of status
    const hasFuturePayment = Array.isArray(u.payments)
      ? u.payments.some((p: any) => new Date(p.dueDate) > now)
      : false;

    const matchesSearch =
      u.name?.toLowerCase().includes(term) ||
      (u.username ?? "").toLowerCase().includes(term) ||
      (u.email ?? "").toLowerCase().includes(term);

    // Apply selected filter
    if (quickFilter === "due" && !hasOverdueUnpaid) return false;
    if (quickFilter === "nofuture" && hasFuturePayment) return false;
    return matchesSearch;
  });

  // Pagination
  const totalUsers = filteredUsers.length;
  const totalPages = Math.max(1, Math.ceil(totalUsers / rowsPerPage));
  const safePage = Math.max(1, Math.min(currentPage, totalPages));
  const pageUsers = filteredUsers.slice((safePage - 1) * rowsPerPage, safePage * rowsPerPage);

  function toPage(p: number) {
    setCurrentPage(Math.max(1, Math.min(totalPages, p)));
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-lg text-zinc-700 dark:text-zinc-200">
          Loading users...
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-zinc-100 dark:bg-zinc-900 px-2 py-8">
      <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-xl p-8 w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-300 mb-4 text-center">
          {translations[lang].manageUsers}
        </h1>
        <div className="flex justify-end w-full mb-6 gap-3">
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder={placeholder}
            className="w-full max-w-xs px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded focus:outline-none focus:ring text-sm bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
          />
          <label className="flex items-center text-sm gap-2 text-zinc-700 dark:text-zinc-200 font-medium">
            {translations[lang].manageUsersQuickFilters ?? "Quick filters"}
            <select
              value={quickFilter}
              onChange={e => setQuickFilter(e.target.value as "all" | "due" | "nofuture")}
              className="ml-1 px-2 py-1 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
              style={{ minWidth: 160 }}
            >
              <option value="all">{translations[lang].manageUsersQuickFilterAll ?? "All"}</option>
              <option value="due">{translations[lang].manageUsersQuickFilterDue ?? "Payments due"}</option>
              <option value="nofuture">{translations[lang].manageUsersQuickFilterNoFuture ?? "No future payments"}</option>
            </select>
          </label>
        </div>
        <table className="w-full text-left border-separate border-spacing-y-1">
          <thead>
            <tr className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200">
              <th className="px-4 py-3 rounded-tl-lg font-semibold text-md">{translations[lang].manageUsersTableName}</th>
              <th className="px-4 py-3 font-semibold text-md">Username</th>
              <th className="px-4 py-3 font-semibold text-md">{translations[lang].manageUsersTableEmail}</th>
              <th className="px-4 py-3 font-semibold text-md">{translations[lang].manageUsersTableStatus}</th>
              <th className="px-4 py-3 rounded-tr-lg font-semibold text-md">{translations[lang].manageUsersTableActions}</th>
            </tr>
          </thead>
          <tbody>
            {pageUsers.map((u: any, i: number) => (
              <tr
                key={u.id}
                className={`bg-white dark:bg-zinc-900 hover:bg-blue-50 dark:hover:bg-blue-900 transition cursor-pointer border-b border-zinc-200 dark:border-zinc-700 ${((safePage - 1) * rowsPerPage + i) % 2 === 1 ? "bg-zinc-50 dark:bg-zinc-950" : ""}`}
                onClick={() => setSelected(u)}
                style={{ boxShadow: "0 1px 3px 0 rgba(16,30,54,0.04)" }}
              >
                <td
                  className="px-4 py-3 whitespace-nowrap text-md font-medium max-w-[160px] overflow-hidden text-ellipsis"
                  style={{ textOverflow: "ellipsis" }}
                  title={u.name}
                >
                  {u.name}
                </td>
                <td
                  className="px-4 py-3 whitespace-nowrap max-w-[130px] overflow-hidden text-ellipsis"
                  style={{ textOverflow: "ellipsis" }}
                  title={u.username}
                >
                  {u.username ?? <span className="italic text-zinc-400">---</span>}
                </td>
                <td
                  className="px-4 py-3 whitespace-nowrap max-w-[210px] overflow-hidden text-ellipsis"
                  style={{ textOverflow: "ellipsis" }}
                  title={u.email}
                >
                  {u.email ?? <span className="italic text-zinc-400">---</span>}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {(() => {
                    // If there is at least one unpaid payment that is due (dueDate <= now && !isPayed)
                    const now = new Date();
                    const hasOverdueUnpaid = Array.isArray(u.payments)
                      ? u.payments.some(
                          (p: any) =>
                            !p.isPayed && new Date(p.dueDate) <= now
                        )
                      : false;
                    return hasOverdueUnpaid ? "❌" : "✅";
                  })()}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">{translations[lang].manageUsersActionsEmpty}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {selected && (
          <AthleteModal
            key={selected.id}
            user={selected}
            lang={lang}
            selectedTab={athleteModalTab}
            setSelectedTab={setAthleteModalTab}
            onClose={() => setSelected(null)}
            onUserUpdate={updatedUser => {
              setUsers(prev =>
                prev.map(u => (u.id === updatedUser.id ? updatedUser : u))
              );
              setSelected(updatedUser);
            }}
          />
        )}

        {/* Pagination controls */}
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-zinc-700 dark:text-zinc-300">
            {totalUsers === 0
              ? (translations[lang].manageUsersTableEmpty ?? "No users.")
              : (translations[lang].manageUsersTableShowing
                ? translations[lang].manageUsersTableShowing
                    .replace("{from}", `${Math.min((safePage - 1) * rowsPerPage + 1, totalUsers)}`)
                    .replace("{to}", `${Math.min(safePage * rowsPerPage, totalUsers)}`)
                    .replace("{total}", `${totalUsers}`)
                : `Showing ${Math.min((safePage - 1) * rowsPerPage + 1, totalUsers)}–${Math.min(safePage * rowsPerPage, totalUsers)} of ${totalUsers} users`)}
          </div>
          <div className="flex items-center gap-1">
            <button
              className="px-2 py-1 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-100 hover:bg-zinc-300 dark:hover:bg-zinc-700 disabled:opacity-50"
              disabled={safePage === 1}
              onClick={() => toPage(safePage - 1)}
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={`px-2 py-1 rounded ${
                  safePage === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                }`}
                onClick={() => toPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="px-2 py-1 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-100 hover:bg-zinc-300 dark:hover:bg-zinc-700 disabled:opacity-50"
              disabled={safePage === totalPages}
              onClick={() => toPage(safePage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
