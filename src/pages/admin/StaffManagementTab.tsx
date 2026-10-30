import { useState, useEffect, useRef, type ChangeEvent, type FormEvent } from "react";
import {
  GraduationCap,
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Search,
  Upload,
  X,
  AlertCircle,
  Save,
} from "lucide-react";
import {
  apiFetchAdminStaff,
  apiCreateStaff,
  apiUpdateStaff,
  apiDeleteStaff,
  type StaffMember,
} from "../../utils/api";
import MultilingualField from "../../components/admin/MultilingualField";

const DEPARTMENTS = [
  "Primary Education (Classes 1–5)",
  "Upper Primary & Secondary (Classes 6–10)",
  "Mathematics & Science",
  "Languages (Marathi, Hindi, English)",
  "Social Sciences & History",
  "Physical Education & Sports",
  "Art, Music & Culture",
  "Digital Literacy & STEM",
  "School Administration & Support",
];

interface StaffManagementTabProps {
  onNotify: (type: "success" | "error", message: string) => void;
}

export default function StaffManagementTab({ onNotify }: StaffManagementTabProps) {
  const [staffList, setStaffList] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form Fields
  const [formData, setFormData] = useState({
    name: "",
    nameMr: "",
    nameHi: "",
    designation: "",
    designationMr: "",
    designationHi: "",
    department: DEPARTMENTS[0],
    qualifications: "",
    experienceYears: 0,
    imageUrl: "",
    bio: "",
    bioMr: "",
    bioHi: "",
    contactEmail: "",
    contactPhone: "",
    displayOrder: 1,
    published: true,
  });

  const [imagePreview, setImagePreview] = useState("");
  const [imageError, setImageError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load staff on mount
  useEffect(() => {
    loadStaff();
  }, []);

  async function loadStaff() {
    setLoading(true);
    const data = await apiFetchAdminStaff();
    // Sort by displayOrder ascending
    data.sort((a, b) => a.displayOrder - b.displayOrder);
    setStaffList(data);
    setLoading(false);
  }

  function handleOpenAdd() {
    setEditingStaff(null);
    setFormData({
      name: "",
      nameMr: "",
      nameHi: "",
      designation: "Assistant Teacher",
      designationMr: "सहाय्यक शिक्षक",
      designationHi: "सहायक शिक्षक",
      department: DEPARTMENTS[0],
      qualifications: "B.A., B.Ed.",
      experienceYears: 5,
      imageUrl: "",
      bio: "",
      bioMr: "",
      bioHi: "",
      contactEmail: "",
      contactPhone: "",
      displayOrder: (staffList.length > 0 ? Math.max(...staffList.map((s) => s.displayOrder)) + 1 : 1),
      published: true,
    });
    setImagePreview("");
    setImageError("");
    setIsModalOpen(true);
  }

  function handleOpenEdit(staff: StaffMember) {
    setEditingStaff(staff);
    setFormData({
      name: staff.name,
      nameMr: staff.nameMr || "",
      nameHi: staff.nameHi || "",
      designation: staff.designation,
      designationMr: staff.designationMr || "",
      designationHi: staff.designationHi || "",
      department: staff.department || DEPARTMENTS[0],
      qualifications: staff.qualifications || "",
      experienceYears: staff.experienceYears || 0,
      imageUrl: staff.imageUrl || "",
      bio: staff.bio || "",
      bioMr: staff.bioMr || "",
      bioHi: staff.bioHi || "",
      contactEmail: staff.contactEmail || "",
      contactPhone: staff.contactPhone || "",
      displayOrder: staff.displayOrder ?? 1,
      published: staff.published !== false,
    });
    setImagePreview(staff.imageUrl || "");
    setImageError("");
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setEditingStaff(null);
    setImagePreview("");
    setImageError("");
  }

  // Handle Photo File Upload (Convert to Base64 with size check < 1.5MB)
  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    setImageError("");
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setImageError("Please upload a valid image file (JPEG, PNG, WebP).");
      return;
    }

    if (file.size > 1.5 * 1024 * 1024) {
      setImageError("Image file size exceeds 1.5MB limit. Please compress the photograph first.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setImagePreview(result);
      setFormData((prev) => ({ ...prev, imageUrl: result }));
    };
    reader.onerror = () => {
      setImageError("Failed to read image file.");
    };
    reader.readAsDataURL(file);
  }

  async function handleSaveStaff(e: FormEvent) {
    e.preventDefault();
    if (!formData.name.trim()) {
      setImageError("Full name (English) is required.");
      return;
    }
    if (!formData.designation.trim()) {
      setImageError("Designation (English) is required.");
      return;
    }

    setSaving(true);
    if (editingStaff) {
      // Update
      const res = await apiUpdateStaff({ id: editingStaff.id, ...formData });
      setSaving(false);
      if (res.success) {
        onNotify("success", `Faculty profile for "${formData.name}" updated successfully.`);
        handleCloseModal();
        loadStaff();
      } else {
        setImageError(res.error || "Failed to update staff profile.");
      }
    } else {
      // Create
      const res = await apiCreateStaff(formData);
      setSaving(false);
      if (res.success) {
        onNotify("success", `New faculty profile for "${formData.name}" added successfully.`);
        handleCloseModal();
        loadStaff();
      } else {
        setImageError(res.error || "Failed to add staff profile.");
      }
    }
  }

  async function handleTogglePublish(staff: StaffMember) {
    const updated = !staff.published;
    const res = await apiUpdateStaff({ id: staff.id, published: updated });
    if (res.success) {
      setStaffList((prev) =>
        prev.map((s) => (s.id === staff.id ? { ...s, published: updated } : s))
      );
      onNotify(
        "success",
        `Faculty member "${staff.name}" is now ${updated ? "published on the public website" : "hidden (draft)"}.`
      );
    } else {
      onNotify("error", "Failed to update publish status.");
    }
  }

  async function handleDeleteStaff(id: string) {
    const res = await apiDeleteStaff(id);
    if (res.success) {
      setStaffList((prev) => prev.filter((s) => s.id !== id));
      setDeleteConfirmId(null);
      onNotify("success", "Faculty profile deleted successfully.");
    } else {
      onNotify("error", res.error || "Failed to delete faculty member.");
    }
  }

  // Filtered List
  const filteredStaff = staffList.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.nameMr && s.nameMr.includes(searchQuery)) ||
      (s.nameHi && s.nameHi.includes(searchQuery)) ||
      s.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.qualifications && s.qualifications.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDept = deptFilter === "all" || s.department === deptFilter;

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "published" && s.published) ||
      (statusFilter === "draft" && !s.published);

    return matchesSearch && matchesDept && matchesStatus;
  });

  return (
    <div className="admin-section staff-management-tab">
      <div className="admin-page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
        <div>
          <h1 className="admin-page-title" style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <GraduationCap size={28} color="var(--clr-green-700)" />
            Faculty &amp; Teaching Staff
          </h1>
          <p className="admin-page-sub" style={{ margin: 0 }}>
            Manage official faculty profiles, credentials, department designations, and public visibility.
          </p>
        </div>
        <button
          type="button"
          className="admin-action-btn admin-action-btn--primary"
          onClick={handleOpenAdd}
          style={{ padding: "0.65rem 1.25rem" }}
        >
          <Plus size={18} /> Add New Teacher
        </button>
      </div>

      {/* Toolbar: Search & Filters */}
      <div className="admin-toolbar" style={{ background: "#ffffff", padding: "1rem", borderRadius: "8px", border: "1px solid var(--clr-neutral-200)", marginBottom: "1.5rem" }}>
        <div className="admin-toolbar__filters" style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", width: "100%" }}>
          <div className="admin-search-input" style={{ flex: "1 1 240px", minWidth: "220px" }}>
            <Search size={16} className="admin-search-icon" />
            <input
              type="text"
              placeholder="Search faculty by name, qualification, designation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <select
            className="admin-form-select"
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            style={{ padding: "0.55rem 0.85rem", border: "1px solid var(--clr-neutral-200)", borderRadius: "6px", fontSize: "0.875rem" }}
          >
            <option value="all">All Departments ({staffList.length})</option>
            {DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>

          <select
            className="admin-form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            style={{ padding: "0.55rem 0.85rem", border: "1px solid var(--clr-neutral-200)", borderRadius: "6px", fontSize: "0.875rem" }}
          >
            <option value="all">All Statuses</option>
            <option value="published">Published Only</option>
            <option value="draft">Drafts / Hidden</option>
          </select>
        </div>
      </div>

      {/* Content Table / List */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "3rem", color: "var(--clr-neutral-500)" }}>
          Loading faculty records...
        </div>
      ) : staffList.length === 0 ? (
        <div className="admin-empty-card" style={{ background: "#ffffff", border: "1px dashed var(--clr-neutral-300)", padding: "3rem 1.5rem", textAlign: "center", borderRadius: "8px" }}>
          <GraduationCap size={44} style={{ color: "var(--clr-green-600)", margin: "0 auto 1rem" }} />
          <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--clr-neutral-800)", marginBottom: "0.5rem" }}>
            No Faculty Members Added Yet
          </h3>
          <p style={{ color: "var(--clr-neutral-500)", maxWidth: "480px", margin: "0 auto 1.5rem", fontSize: "0.9rem" }}>
            The public Teaching Staff page currently displays the official institutional notice. Add your teachers and school leaders to showcase them on the website.
          </p>
          <button
            type="button"
            className="admin-action-btn admin-action-btn--primary"
            onClick={handleOpenAdd}
          >
            <Plus size={16} /> Add First Teacher
          </button>
        </div>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: "60px" }}>Order</th>
                <th style={{ width: "70px" }}>Photo</th>
                <th>Teacher Name &amp; Designation</th>
                <th>Department</th>
                <th>Qualifications</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStaff.map((staff) => (
                <tr key={staff.id}>
                  <td data-label="Order">
                    <span style={{ fontWeight: 700, color: "var(--clr-neutral-600)" }}>
                      #{staff.displayOrder}
                    </span>
                  </td>
                  <td data-label="Photo">
                    {staff.imageUrl ? (
                      <img
                        src={staff.imageUrl}
                        alt={staff.name}
                        style={{ width: "42px", height: "42px", borderRadius: "50%", objectFit: "cover", border: "1px solid var(--clr-neutral-200)" }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "42px",
                          height: "42px",
                          borderRadius: "50%",
                          background: "var(--clr-forest-900, #0d2818)",
                          color: "#ffffff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 700,
                          fontSize: "0.9rem",
                        }}
                      >
                        {staff.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </td>
                  <td data-label="Name">
                    <div>
                      <strong style={{ fontSize: "0.95rem", color: "var(--clr-neutral-900)", display: "block" }}>
                        {staff.name}
                      </strong>
                      <span style={{ fontSize: "0.8rem", color: "var(--clr-neutral-500)" }}>
                        {staff.designation}
                        {staff.nameMr && ` • ${staff.nameMr}`}
                      </span>
                    </div>
                  </td>
                  <td data-label="Department">
                    <span style={{ fontSize: "0.82rem", background: "rgba(13, 40, 24, 0.06)", padding: "0.2rem 0.5rem", borderRadius: "4px", color: "var(--clr-forest-950, #07190f)" }}>
                      {staff.department}
                    </span>
                  </td>
                  <td data-label="Qualifications">
                    <span style={{ fontSize: "0.85rem", color: "var(--clr-neutral-700)" }}>
                      {staff.qualifications || "—"}
                    </span>
                    {staff.experienceYears ? (
                      <span style={{ display: "block", fontSize: "0.75rem", color: "var(--clr-neutral-500)" }}>
                        {staff.experienceYears} yrs experience
                      </span>
                    ) : null}
                  </td>
                  <td data-label="Status">
                    <button
                      type="button"
                      onClick={() => handleTogglePublish(staff)}
                      className={`badge-status ${staff.published ? "badge-status--active" : "badge-status--inactive"}`}
                      style={{ cursor: "pointer", border: "none" }}
                      title="Click to toggle publish status"
                    >
                      {staff.published ? <Eye size={12} /> : <EyeOff size={12} />}
                      <span>{staff.published ? "Published" : "Draft"}</span>
                    </button>
                  </td>
                  <td data-label="Actions" style={{ textAlign: "right" }}>
                    <div style={{ display: "inline-flex", gap: "0.4rem" }}>
                      <button
                        type="button"
                        className="admin-action-btn admin-action-btn--secondary"
                        style={{ padding: "0.35rem 0.6rem" }}
                        onClick={() => handleOpenEdit(staff)}
                        title="Edit profile"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        type="button"
                        className="admin-action-btn admin-action-btn--danger"
                        style={{ padding: "0.35rem 0.6rem" }}
                        onClick={() => setDeleteConfirmId(staff.id)}
                        title="Delete teacher profile"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── ADD / EDIT MODAL ── */}
      {isModalOpen && (
        <div className="admin-modal-overlay" role="dialog" aria-modal="true">
          <div className="admin-modal" style={{ maxWidth: "680px", maxHeight: "90vh", display: "flex", flexDirection: "column" }}>
            <div className="admin-modal__header">
              <h2 className="admin-modal__title">
                {editingStaff ? `Edit Teacher: ${editingStaff.name}` : "Add New Faculty Member"}
              </h2>
              <button
                type="button"
                onClick={handleCloseModal}
                style={{ background: "none", border: "none", color: "#ffffff", cursor: "pointer" }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveStaff} style={{ display: "flex", flexDirection: "column", overflowY: "auto", flex: 1 }}>
              <div className="admin-modal__body" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {imageError && (
                  <div style={{ background: "#fef0f0", border: "1px solid #f8b4b4", color: "#c53030", padding: "0.6rem 0.85rem", borderRadius: "6px", fontSize: "0.82rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <AlertCircle size={15} />
                    <span>{imageError}</span>
                  </div>
                )}

                {/* Photo Upload Section */}
                <div style={{ display: "flex", gap: "1.25rem", alignItems: "center", background: "var(--clr-neutral-50)", padding: "1rem", borderRadius: "8px", border: "1px solid var(--clr-neutral-200)" }}>
                  <div style={{ position: "relative" }}>
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        style={{ width: "72px", height: "72px", borderRadius: "50%", objectFit: "cover", border: "2px solid var(--clr-green-700)" }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "72px",
                          height: "72px",
                          borderRadius: "50%",
                          background: "var(--clr-neutral-200)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "var(--clr-neutral-500)",
                        }}
                      >
                        <GraduationCap size={32} />
                      </div>
                    )}
                  </div>

                  <div style={{ flex: 1 }}>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, marginBottom: "0.3rem", color: "var(--clr-neutral-800)" }}>
                      Faculty Photograph
                    </label>
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
                      <button
                        type="button"
                        className="admin-action-btn admin-action-btn--secondary"
                        style={{ fontSize: "0.8rem", padding: "0.4rem 0.75rem" }}
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload size={14} /> Upload Local Photo
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                      />
                      {imagePreview && (
                        <button
                          type="button"
                          className="admin-action-btn admin-action-btn--ghost"
                          style={{ fontSize: "0.78rem", color: "#dc3545", padding: "0.4rem" }}
                          onClick={() => {
                            setImagePreview("");
                            setFormData((prev) => ({ ...prev, imageUrl: "" }));
                          }}
                        >
                          Remove Photo
                        </button>
                      )}
                    </div>
                    <span style={{ display: "block", fontSize: "0.72rem", color: "var(--clr-neutral-500)", marginTop: "0.3rem" }}>
                      Max 1.5MB (JPEG, PNG, WebP). Alternatively, paste an image URL below.
                    </span>
                    <input
                      type="text"
                      className="admin-form-input"
                      placeholder="Or paste image URL (e.g. /assets/images/...)"
                      value={formData.imageUrl}
                      onChange={(e) => {
                        setFormData({ ...formData, imageUrl: e.target.value });
                        setImagePreview(e.target.value);
                      }}
                      style={{ marginTop: "0.4rem", fontSize: "0.8rem", padding: "0.4rem 0.6rem" }}
                    />
                  </div>
                </div>

                {/* Multilingual Names */}
                <MultilingualField
                  label="Teacher Name"
                  required
                  context="name"
                  values={{ en: formData.name, mr: formData.nameMr, hi: formData.nameHi }}
                  onChange={(v) =>
                    setFormData((prev) => ({ ...prev, name: v.en, nameMr: v.mr, nameHi: v.hi }))
                  }
                  placeholder={{
                    en: "e.g. Smt. Uma Kukudpewar",
                    mr: "उदा. सौ. उमा कुकूडपेवार",
                    hi: "उदा. श्रीमती उमा कुकूदपेवार",
                  }}
                />

                {/* Multilingual Designation */}
                <MultilingualField
                  label="Designation"
                  required
                  context="title"
                  values={{
                    en: formData.designation,
                    mr: formData.designationMr,
                    hi: formData.designationHi,
                  }}
                  onChange={(v) =>
                    setFormData((prev) => ({
                      ...prev,
                      designation: v.en,
                      designationMr: v.mr,
                      designationHi: v.hi,
                    }))
                  }
                  placeholder={{
                    en: "e.g. Assistant Teacher",
                    mr: "उदा. सहाय्यक शिक्षक",
                    hi: "उदा. सहायक शिक्षक",
                  }}
                />

                {/* Department & Qualifications */}
                <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "0.75rem" }}>
                  <div>
                    <label className="admin-form-label">Academic Department *</label>
                    <select
                      className="admin-form-select"
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    >
                      {DEPARTMENTS.map((dept) => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="admin-form-label">Qualifications</label>
                    <input
                      type="text"
                      className="admin-form-input"
                      placeholder="e.g. M.Sc., B.Ed., SET"
                      value={formData.qualifications}
                      onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
                    />
                  </div>
                </div>

                {/* Experience & Display Order */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1.2fr", gap: "0.75rem" }}>
                  <div>
                    <label className="admin-form-label">Experience (Years)</label>
                    <input
                      type="number"
                      min="0"
                      max="60"
                      className="admin-form-input"
                      value={formData.experienceYears}
                      onChange={(e) => setFormData({ ...formData, experienceYears: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <label className="admin-form-label">Display Order</label>
                    <input
                      type="number"
                      min="1"
                      className="admin-form-input"
                      value={formData.displayOrder}
                      onChange={(e) => setFormData({ ...formData, displayOrder: Number(e.target.value) })}
                    />
                  </div>
                  <div style={{ display: "flex", alignItems: "center", paddingTop: "1.25rem" }}>
                    <label style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontSize: "0.85rem", fontWeight: 600 }}>
                      <input
                        type="checkbox"
                        checked={formData.published}
                        onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                      />
                      <span>Publish on Website</span>
                    </label>
                  </div>
                </div>

                {/* Multilingual Biography */}
                <MultilingualField
                  label="Biography / Teaching Philosophy"
                  type="textarea"
                  rows={2}
                  context="content"
                  values={{
                    en: formData.bio,
                    mr: formData.bioMr,
                    hi: formData.bioHi,
                  }}
                  onChange={(v) =>
                    setFormData((prev) => ({
                      ...prev,
                      bio: v.en,
                      bioMr: v.mr,
                      bioHi: v.hi,
                    }))
                  }
                  placeholder={{
                    en: "Short summary of background, teaching specialization, or accolades...",
                    mr: "शिक्षकाचा संक्षिप्त परिचय, विशेष कौशल्ये, अनुभव...",
                    hi: "शिक्षक का संक्षिप्त परिचय, विशेषज्ञता, अनुभव...",
                  }}
                />
              </div>

              <div className="admin-modal__footer">
                <button
                  type="button"
                  className="admin-action-btn admin-action-btn--secondary"
                  onClick={handleCloseModal}
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="admin-action-btn admin-action-btn--primary"
                  disabled={saving}
                >
                  <Save size={16} />
                  <span>{saving ? "Saving..." : editingStaff ? "Update Faculty Member" : "Save Faculty Member"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── DELETE CONFIRMATION MODAL ── */}
      {deleteConfirmId && (
        <div className="admin-modal-overlay" role="dialog" aria-modal="true">
          <div className="admin-modal" style={{ maxWidth: "420px" }}>
            <div className="admin-modal__header" style={{ background: "#dc3545" }}>
              <h2 className="admin-modal__title">Delete Faculty Profile?</h2>
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
                Are you sure you want to delete this faculty member from the database? This action cannot be undone.
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
                onClick={() => handleDeleteStaff(deleteConfirmId)}
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

