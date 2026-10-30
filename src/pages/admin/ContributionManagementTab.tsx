import { useState, useEffect } from "react";
import {
  HeartHandshake,
  Search,
  Eye,
  X,
  Clock,
  Phone,
  Mail,
  FileText,
  Save,
  Trash2,
  Filter,
  Inbox,
  Copy,
  Check,
} from "lucide-react";
import {
  apiFetchContributions,
  apiUpdateContribution,
  apiDeleteContribution,
  type ContributionEnquiry,
  type ContributionCategory,
  type ContributionStatus,
} from "../../utils/api";

const STATUS_OPTIONS: { value: ContributionStatus; label: string; color: string; bg: string }[] = [
  { value: "received", label: "Received", color: "#1d4ed8", bg: "#dbeafe" },
  { value: "contacted", label: "Contacted", color: "#0369a1", bg: "#e0f2fe" },
  { value: "under_review", label: "Under Review", color: "#92400e", bg: "#fef3c7" },
  { value: "instructions_provided", label: "Instructions Sent", color: "#7c3aed", bg: "#ede9fe" },
  { value: "verified_completed", label: "Verified / Completed", color: "#166534", bg: "#dcfce7" },
  { value: "rejected", label: "Rejected", color: "#991b1b", bg: "#fee2e2" },
  { value: "archived", label: "Archived", color: "#4b5563", bg: "#f3f4f6" },
];

const CATEGORY_LABELS: Record<ContributionCategory, string> = {
  financial: "Financial / Development Fund",
  learning_resources: "Learning Resources (Books & Kits)",
  digital: "Digital & STEM Equipment",
  sports: "Sports & Athletics",
  infrastructure: "Infrastructure & Eco-Campus",
  community: "Community Volunteering",
  other: "Other",
};

function getStatusInfo(status: ContributionStatus) {
  return STATUS_OPTIONS.find((s) => s.value === status) || STATUS_OPTIONS[0];
}

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

interface ContributionManagementTabProps {
  onNotify: (type: "success" | "error", message: string) => void;
}

export default function ContributionManagementTab({ onNotify }: ContributionManagementTabProps) {
  const [contributions, setContributions] = useState<ContributionEnquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Detail modal
  const [selectedEnquiry, setSelectedEnquiry] = useState<ContributionEnquiry | null>(null);
  const [editStatus, setEditStatus] = useState<ContributionStatus>("received");
  const [editNotes, setEditNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [copiedRef, setCopiedRef] = useState(false);

  // Delete confirm
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  useEffect(() => {
    loadContributions();
  }, []);

  async function loadContributions() {
    setLoading(true);
    const res = await apiFetchContributions();
    if (res.success && res.contributions) {
      // Sort by submittedAt descending (newest first)
      res.contributions.sort(
        (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
      );
      setContributions(res.contributions);
    }
    setLoading(false);
  }

  function openDetail(enquiry: ContributionEnquiry) {
    setSelectedEnquiry(enquiry);
    setEditStatus(enquiry.status);
    setEditNotes(enquiry.adminNotes || "");
    setCopiedRef(false);
  }

  function closeDetail() {
    setSelectedEnquiry(null);
  }

  async function handleSaveUpdate() {
    if (!selectedEnquiry) return;
    setSaving(true);
    const res = await apiUpdateContribution(selectedEnquiry.id, {
      status: editStatus,
      adminNotes: editNotes,
    });
    setSaving(false);
    if (res.success) {
      setContributions((prev) =>
        prev.map((c) =>
          c.id === selectedEnquiry.id ? { ...c, status: editStatus, adminNotes: editNotes } : c
        )
      );
      setSelectedEnquiry({ ...selectedEnquiry, status: editStatus, adminNotes: editNotes });
      onNotify("success", "Contribution enquiry updated successfully.");
    } else {
      onNotify("error", res.error || "Failed to update enquiry.");
    }
  }

  async function handleDelete(id: string) {
    const res = await apiDeleteContribution(id);
    if (res.success) {
      setContributions((prev) => prev.filter((c) => c.id !== id));
      setDeleteConfirmId(null);
      if (selectedEnquiry?.id === id) closeDetail();
      onNotify("success", "Contribution enquiry deleted.");
    } else {
      onNotify("error", res.error || "Failed to delete enquiry.");
    }
  }

  function handleCopyRef(ref: string) {
    navigator.clipboard.writeText(ref);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  }

  // Computed stats
  const statCounts = {
    total: contributions.length,
    received: contributions.filter((c) => c.status === "received").length,
    contacted: contributions.filter((c) => c.status === "contacted").length,
    underReview: contributions.filter((c) => c.status === "under_review").length,
    completed: contributions.filter((c) => c.status === "verified_completed").length,
  };

  // Filtered list
  const filtered = contributions.filter((c) => {
    const matchesSearch =
      searchQuery === "" ||
      c.contributorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.organization && c.organization.toLowerCase().includes(searchQuery.toLowerCase())) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCat = categoryFilter === "all" || c.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || c.status === statusFilter;

    return matchesSearch && matchesCat && matchesStatus;
  });

  return (
    <div className="admin-section">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
        <div>
          <h1 className="admin-page-title" style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <HeartHandshake size={28} color="var(--clr-green-700)" />
            Contribution Enquiries
          </h1>
          <p className="admin-page-sub" style={{ margin: 0 }}>
            Track, review, and manage community contribution proposals and support enquiries.
          </p>
        </div>
      </div>

      {/* Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "0.85rem", marginBottom: "1.5rem" }}>
        <div className="admin-stat-card" style={{ padding: "1rem 1.25rem" }}>
          <div className="admin-stat-card__num" style={{ fontSize: "1.75rem" }}>{statCounts.total}</div>
          <div className="admin-stat-card__label">Total Enquiries</div>
        </div>
        <div className="admin-stat-card" style={{ padding: "1rem 1.25rem", borderLeft: "3px solid #3b82f6" }}>
          <div className="admin-stat-card__num" style={{ fontSize: "1.75rem", color: "#1d4ed8" }}>{statCounts.received}</div>
          <div className="admin-stat-card__label">New / Received</div>
        </div>
        <div className="admin-stat-card" style={{ padding: "1rem 1.25rem", borderLeft: "3px solid #f59e0b" }}>
          <div className="admin-stat-card__num" style={{ fontSize: "1.75rem", color: "#92400e" }}>{statCounts.underReview}</div>
          <div className="admin-stat-card__label">Under Review</div>
        </div>
        <div className="admin-stat-card" style={{ padding: "1rem 1.25rem", borderLeft: "3px solid #10b981" }}>
          <div className="admin-stat-card__num" style={{ fontSize: "1.75rem", color: "#166534" }}>{statCounts.completed}</div>
          <div className="admin-stat-card__label">Completed</div>
        </div>
      </div>

      {/* Toolbar */}
      <div style={{ background: "#ffffff", padding: "1rem", borderRadius: "8px", border: "1px solid var(--clr-neutral-200)", marginBottom: "1.25rem", display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center" }}>
        <div className="admin-search-input" style={{ flex: "1 1 260px", minWidth: "220px" }}>
          <Search size={16} className="admin-search-icon" />
          <input
            type="text"
            placeholder="Search by name, reference ID, or organization..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          style={{ padding: "0.55rem 0.85rem", border: "1px solid var(--clr-neutral-200)", borderRadius: "6px", fontSize: "0.85rem" }}
        >
          <option value="all">All Categories</option>
          {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ padding: "0.55rem 0.85rem", border: "1px solid var(--clr-neutral-200)", borderRadius: "6px", fontSize: "0.85rem" }}
        >
          <option value="all">All Statuses</option>
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* Content */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "3rem", color: "var(--clr-neutral-500)" }}>
          Loading contribution enquiries...
        </div>
      ) : contributions.length === 0 ? (
        <div style={{ background: "#ffffff", border: "1px dashed var(--clr-neutral-300)", padding: "3rem 1.5rem", textAlign: "center", borderRadius: "8px" }}>
          <Inbox size={44} style={{ color: "var(--clr-neutral-400)", margin: "0 auto 1rem" }} />
          <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--clr-neutral-800)", marginBottom: "0.5rem" }}>
            No Contribution Enquiries Yet
          </h3>
          <p style={{ color: "var(--clr-neutral-500)", maxWidth: "440px", margin: "0 auto", fontSize: "0.9rem" }}>
            When community members submit a contribution enquiry through the public website, their proposals will appear here.
          </p>
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ background: "#ffffff", padding: "2rem", textAlign: "center", borderRadius: "8px", border: "1px solid var(--clr-neutral-200)" }}>
          <Filter size={32} style={{ color: "var(--clr-neutral-400)", marginBottom: "0.75rem" }} />
          <p style={{ color: "var(--clr-neutral-600)", fontSize: "0.9rem" }}>
            No enquiries match your current filters. Try adjusting the search or filter criteria.
          </p>
        </div>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Reference</th>
                <th>Contributor</th>
                <th>Category</th>
                <th>Proposed</th>
                <th>Date</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => {
                const statusInfo = getStatusInfo(item.status);
                return (
                  <tr key={item.id}>
                    <td data-label="Reference">
                      <span style={{ fontFamily: "monospace", fontSize: "0.78rem", fontWeight: 700, color: "var(--clr-green-700)" }}>
                        {item.id.length > 20 ? `...${item.id.slice(-12)}` : item.id}
                      </span>
                    </td>
                    <td data-label="Contributor">
                      <div>
                        <strong style={{ display: "block", fontSize: "0.9rem", color: "var(--clr-neutral-900)" }}>
                          {item.contributorName}
                        </strong>
                        {item.organization && (
                          <span style={{ fontSize: "0.78rem", color: "var(--clr-neutral-500)" }}>
                            {item.organization}
                          </span>
                        )}
                      </div>
                    </td>
                    <td data-label="Category">
                      <span style={{ fontSize: "0.8rem", color: "var(--clr-neutral-700)" }}>
                        {CATEGORY_LABELS[item.category] || item.category}
                      </span>
                    </td>
                    <td data-label="Amount">
                      {item.proposedAmount ? (
                        <span style={{ fontWeight: 700, color: "var(--clr-neutral-800)" }}>
                          ₹{item.proposedAmount.toLocaleString("en-IN")}
                        </span>
                      ) : (
                        <span style={{ color: "var(--clr-neutral-400)", fontSize: "0.82rem" }}>
                          In-kind / TBD
                        </span>
                      )}
                    </td>
                    <td data-label="Date">
                      <span style={{ fontSize: "0.82rem", color: "var(--clr-neutral-600)" }}>
                        {formatDate(item.submittedAt)}
                      </span>
                    </td>
                    <td data-label="Status">
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                          padding: "0.22rem 0.55rem",
                          borderRadius: "12px",
                          fontSize: "0.72rem",
                          fontWeight: 600,
                          color: statusInfo.color,
                          background: statusInfo.bg,
                        }}
                      >
                        {statusInfo.label}
                      </span>
                    </td>
                    <td data-label="Actions" style={{ textAlign: "right" }}>
                      <div style={{ display: "inline-flex", gap: "0.4rem" }}>
                        <button
                          type="button"
                          className="admin-action-btn admin-action-btn--secondary"
                          style={{ padding: "0.35rem 0.6rem" }}
                          onClick={() => openDetail(item)}
                          title="View details"
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          type="button"
                          className="admin-action-btn admin-action-btn--danger"
                          style={{ padding: "0.35rem 0.6rem" }}
                          onClick={() => setDeleteConfirmId(item.id)}
                          title="Delete enquiry"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* ── DETAIL / EDIT MODAL ── */}
      {selectedEnquiry && (
        <div className="admin-modal-overlay" role="dialog" aria-modal="true">
          <div className="admin-modal" style={{ maxWidth: "640px", maxHeight: "90vh", display: "flex", flexDirection: "column" }}>
            <div className="admin-modal__header">
              <h2 className="admin-modal__title">Contribution Enquiry Details</h2>
              <button
                type="button"
                onClick={closeDetail}
                style={{ background: "none", border: "none", color: "#ffffff", cursor: "pointer" }}
              >
                <X size={20} />
              </button>
            </div>

            <div className="admin-modal__body" style={{ overflowY: "auto", flex: 1 }}>
              {/* Reference ID */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem", background: "var(--clr-neutral-50)", padding: "0.65rem 0.85rem", borderRadius: "6px", border: "1px solid var(--clr-neutral-200)" }}>
                <FileText size={16} style={{ color: "var(--clr-green-700)", flexShrink: 0 }} />
                <code style={{ fontFamily: "monospace", fontSize: "0.85rem", fontWeight: 700, color: "var(--clr-green-700)", flex: 1 }}>
                  {selectedEnquiry.id}
                </code>
                <button
                  type="button"
                  onClick={() => handleCopyRef(selectedEnquiry.id)}
                  style={{ background: "none", border: "none", cursor: "pointer", padding: "0.25rem", color: "var(--clr-neutral-600)" }}
                  title="Copy reference"
                >
                  {copiedRef ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                </button>
              </div>

              {/* Contributor Info */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.25rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--clr-neutral-500)", marginBottom: "0.2rem" }}>
                    Contributor
                  </label>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: "0.95rem", color: "var(--clr-neutral-900)" }}>
                    {selectedEnquiry.contributorName}
                  </p>
                  {selectedEnquiry.organization && (
                    <span style={{ fontSize: "0.8rem", color: "var(--clr-neutral-500)" }}>
                      {selectedEnquiry.organization}
                    </span>
                  )}
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--clr-neutral-500)", marginBottom: "0.2rem" }}>
                    Contact
                  </label>
                  {selectedEnquiry.phone && (
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.85rem", color: "var(--clr-neutral-800)", marginBottom: "0.15rem" }}>
                      <Phone size={13} /> {selectedEnquiry.phone}
                    </div>
                  )}
                  {selectedEnquiry.email && (
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.85rem", color: "var(--clr-neutral-800)" }}>
                      <Mail size={13} /> {selectedEnquiry.email}
                    </div>
                  )}
                  <span style={{ fontSize: "0.72rem", color: "var(--clr-neutral-500)", marginTop: "0.2rem", display: "block" }}>
                    Preferred: {selectedEnquiry.preferredContact === "whatsapp" ? "WhatsApp" : selectedEnquiry.preferredContact === "email" ? "Email" : "Phone Call"}
                  </span>
                </div>
              </div>

              {/* Category & Amount */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.25rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--clr-neutral-500)", marginBottom: "0.2rem" }}>
                    Category
                  </label>
                  <p style={{ margin: 0, fontSize: "0.88rem", fontWeight: 600, color: "var(--clr-neutral-800)" }}>
                    {CATEGORY_LABELS[selectedEnquiry.category] || selectedEnquiry.category}
                  </p>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--clr-neutral-500)", marginBottom: "0.2rem" }}>
                    Proposed Amount
                  </label>
                  <p style={{ margin: 0, fontSize: "0.95rem", fontWeight: 700, color: selectedEnquiry.proposedAmount ? "var(--clr-neutral-900)" : "var(--clr-neutral-400)" }}>
                    {selectedEnquiry.proposedAmount ? `₹${selectedEnquiry.proposedAmount.toLocaleString("en-IN")}` : "In-kind / To be discussed"}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div style={{ marginBottom: "1.25rem" }}>
                <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--clr-neutral-500)", marginBottom: "0.35rem" }}>
                  Description of Proposed Contribution
                </label>
                <div style={{ background: "var(--clr-neutral-50)", padding: "0.85rem 1rem", borderRadius: "6px", border: "1px solid var(--clr-neutral-200)", fontSize: "0.88rem", lineHeight: "1.55", color: "var(--clr-neutral-800)" }}>
                  {selectedEnquiry.description}
                </div>
              </div>

              {/* Submitted date */}
              <div style={{ display: "flex", gap: "1rem", marginBottom: "1.25rem", fontSize: "0.8rem", color: "var(--clr-neutral-500)" }}>
                <span>
                  <Clock size={13} style={{ verticalAlign: "middle", marginRight: "0.3rem" }} />
                  Submitted: {formatDate(selectedEnquiry.submittedAt)}
                </span>
                <span>
                  Updated: {formatDate(selectedEnquiry.updatedAt)}
                </span>
              </div>

              <hr style={{ border: "none", borderTop: "1px solid var(--clr-neutral-200)", margin: "0.75rem 0 1.25rem" }} />

              {/* Admin Controls: Status & Notes */}
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--clr-neutral-800)", marginBottom: "0.35rem" }}>
                  Update Status
                </label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as ContributionStatus)}
                  style={{ width: "100%", padding: "0.6rem 0.85rem", border: "1px solid var(--clr-neutral-200)", borderRadius: "6px", fontSize: "0.88rem" }}
                >
                  {STATUS_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--clr-neutral-800)", marginBottom: "0.35rem" }}>
                  Administrative Notes (Internal)
                </label>
                <textarea
                  rows={3}
                  placeholder="Internal notes for school administration — not visible to the contributor..."
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  style={{ width: "100%", padding: "0.6rem 0.85rem", border: "1px solid var(--clr-neutral-200)", borderRadius: "6px", fontSize: "0.85rem", resize: "vertical" }}
                />
              </div>
            </div>

            <div className="admin-modal__footer">
              <button
                type="button"
                className="admin-action-btn admin-action-btn--secondary"
                onClick={closeDetail}
                disabled={saving}
              >
                Close
              </button>
              <button
                type="button"
                className="admin-action-btn admin-action-btn--primary"
                onClick={handleSaveUpdate}
                disabled={saving}
              >
                <Save size={16} />
                <span>{saving ? "Saving..." : "Save Changes"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── DELETE CONFIRMATION MODAL ── */}
      {deleteConfirmId && (
        <div className="admin-modal-overlay" role="dialog" aria-modal="true">
          <div className="admin-modal" style={{ maxWidth: "420px" }}>
            <div className="admin-modal__header" style={{ background: "#dc3545" }}>
              <h2 className="admin-modal__title">Delete Enquiry?</h2>
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                style={{ background: "none", border: "none", color: "#ffffff", cursor: "pointer" }}
              >
                <X size={18} />
              </button>
            </div>
            <div className="admin-modal__body">
              <p style={{ fontSize: "0.9rem", color: "var(--clr-neutral-700)", margin: 0 }}>
                Are you sure you want to permanently delete this contribution enquiry? This action cannot be undone.
              </p>
            </div>
            <div className="admin-modal__footer">
              <button
                type="button"
                className="admin-action-btn admin-action-btn--secondary"
                onClick={() => setDeleteConfirmId(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="admin-action-btn admin-action-btn--danger"
                onClick={() => handleDelete(deleteConfirmId)}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
