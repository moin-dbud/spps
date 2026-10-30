import { useState, useEffect } from "react";
import {
  GraduationCap,
  BookOpen,
  Award,
  Sparkles,
  Mail,
  Phone,
  Briefcase,
  Users,
  Compass,
} from "lucide-react";
import { useI18n } from "../i18n";
import { apiFetchPublicStaff, type StaffMember } from "../utils/api";
import { useScrollReveal } from "../hooks/useScrollReveal";
import "./TeachingStaff.css";

/* =========================================================
   TEACHING STAFF PAGE — INSTITUTIONAL FACULTY MONOGRAPH
   PM Shri Savitribai Phule School, Babupeth, Chandrapur
   ========================================================= */

export default function TeachingStaff() {
  const { t, lang } = useI18n();
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDept, setSelectedDept] = useState<string>("all");

  useScrollReveal([staff, selectedDept, lang]);

  const l = (en: string, hi: string, mr: string) =>
    lang === "en" ? en : lang === "hi" ? hi : mr;

  useEffect(() => {
    let mounted = true;
    apiFetchPublicStaff()
      .then((items) => {
        if (mounted) {
          setStaff(items);
          setLoading(false);
        }
      })
      .catch(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  // Department filters derived dynamically from published staff + standard categories
  const departments = [
    { id: "all", label: t.teachingStaff.allDepartments },
    { id: "Leadership", label: t.teachingStaff.filterLeadership },
    { id: "Languages", label: t.teachingStaff.filterLanguages },
    { id: "Science & Mathematics", label: t.teachingStaff.filterScienceMaths },
    { id: "Digital & ICT", label: t.teachingStaff.filterDigital },
    { id: "Sports & Co-Curricular", label: t.teachingStaff.filterActivities },
  ];

  const filteredStaff = staff.filter((member) => {
    if (selectedDept === "all") return true;
    if (selectedDept === "Leadership") {
      const des = (member.designation || "").toLowerCase();
      return (
        des.includes("principal") ||
        des.includes("head") ||
        des.includes("vice") ||
        des.includes("coordinator") ||
        member.department === "Leadership"
      );
    }
    return member.department.toLowerCase().includes(selectedDept.toLowerCase());
  });

  const getLocalizedName = (m: StaffMember) => {
    if (lang === "mr" && m.nameMr) return m.nameMr;
    if (lang === "hi" && m.nameHi) return m.nameHi;
    return m.name;
  };

  const getLocalizedDesignation = (m: StaffMember) => {
    if (lang === "mr" && m.designationMr) return m.designationMr;
    if (lang === "hi" && m.designationHi) return m.designationHi;
    return m.designation;
  };

  const getLocalizedBio = (m: StaffMember) => {
    if (lang === "mr" && m.bioMr) return m.bioMr;
    if (lang === "hi" && m.bioHi) return m.bioHi;
    return m.bio;
  };

  return (
    <div className="teaching-staff-page">
      {/* ===== 1. HERO SPREAD ===== */}
      <section className="staff-hero" aria-label="Faculty Header">
        <div className="container">
          <div className="staff-hero__kicker hero-seq-1">
            <span className="staff-kicker-badge">
              <GraduationCap size={15} aria-hidden />
              {t.teachingStaff.badge}
            </span>
            <span className="staff-kicker-sub">
              {l("Academic Excellence & Mentorship", "शैक्षणिक गुणवत्ता व मार्गदर्शन", "शैक्षणिक गुणवत्ता व मार्गदर्शन")}
            </span>
          </div>

          <h1 className="staff-hero__title hero-seq-2">
            {t.teachingStaff.title}
          </h1>

          <div className="staff-hero__rule hero-seq-2" aria-hidden />

          <p className="staff-hero__lead hero-seq-3">
            {t.teachingStaff.subtitle}
          </p>

          <div className="staff-hero__highlights hero-seq-4">
            <div className="staff-highlight-item">
              <span className="staff-highlight-dot" />
              <div>
                <strong>NEP 2020 Trained</strong>
                <span>{l("FLN & Experiential Pedagogy", "मूलभूत साक्षरता व संख्याज्ञान", "मूलभूत साक्षरता व संख्याज्ञान")}</span>
              </div>
            </div>
            <div className="staff-highlight-item">
              <span className="staff-highlight-dot" />
              <div>
                <strong>Digital Smart Classrooms</strong>
                <span>{l("Interactive Panel Competency", "डिजिटल पॅनेल व आयटी अध्यापन", "डिजिटल पॅनेल व आयटी अध्यापन")}</span>
              </div>
            </div>
            <div className="staff-highlight-item">
              <span className="staff-highlight-dot" />
              <div>
                <strong>Continuous Mentorship</strong>
                <span>{l("Child Welfare & Guidance", "विद्यार्थी हित व पालक समन्वय", "विद्यार्थी हित व पालक समन्वय")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 2. FACULTY DIRECTORY & FILTERS ===== */}
      <section className="staff-directory-section bg-parchment-light">
        <div className="container">

          {/* Department Filter Bar */}
          {staff.length > 0 && (
            <div className="staff-filter-bar reveal-on-scroll">
              <div className="staff-filter-label">
                <Compass size={15} />
                <span>{l("Department Filter", "विभाग निवडा", "विभाग निवडा")}:</span>
              </div>
              <div className="staff-filter-pills" role="tablist">
                {departments.map((dept) => (
                  <button
                    key={dept.id}
                    role="tab"
                    aria-selected={selectedDept === dept.id}
                    className={`staff-filter-pill ${selectedDept === dept.id ? "active" : ""}`}
                    onClick={() => setSelectedDept(dept.id)}
                  >
                    {dept.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="staff-loading-box">
              <div className="staff-spinner" />
              <p>{t.common.loading}</p>
            </div>
          ) : filteredStaff.length === 0 ? (
            /* ===== 3. DIGNIFIED EMPTY STATE ===== */
            <div className="staff-empty-state reveal-on-scroll">
              <div className="staff-empty-icon-wrap">
                <Users size={44} />
              </div>
              <h2 className="staff-empty-title">
                {t.teachingStaff.emptyTitle}
              </h2>
              <div className="editorial-rule editorial-rule--gold" style={{ margin: "1rem auto" }} />
              <p className="staff-empty-text">
                {t.teachingStaff.emptySubtitle}
              </p>
              <div className="staff-empty-notice">
                <Sparkles size={16} />
                <span>
                  {l(
                    "School administrators can publish verified staff profiles through the admin dashboard.",
                    "विद्यालय व्यवस्थापक एडमिन पोर्टल के माध्यम से अधिकृत शिक्षक विवरण प्रकाशित कर सकते हैं।",
                    "शाळा व्यवस्थापक ॲडमिन पोर्टलद्वारे अधिकृत शिक्षक माहिती प्रकाशित करू शकतात."
                  )}
                </span>
              </div>
            </div>
          ) : (
            /* ===== 4. STAFF DIRECTORY GRID ===== */
            <div className="staff-grid">
              {filteredStaff.map((member, idx) => (
                <article
                  key={member.id}
                  className={`staff-card reveal-on-scroll reveal-delay-${(idx % 4) + 1}`}
                >
                  <div className="staff-card__photo-frame">
                    {member.imageUrl ? (
                      <img
                        src={member.imageUrl}
                        alt={getLocalizedName(member)}
                        className="staff-card__img"
                        loading="lazy"
                        onError={(e) => {
                          (e.currentTarget as HTMLElement).style.display = "none";
                          (e.currentTarget.parentElement as HTMLElement).classList.add("has-avatar");
                        }}
                      />
                    ) : null}
                    <div className="staff-card__avatar-fallback" aria-hidden>
                      <span>{member.name.charAt(0).toUpperCase()}</span>
                    </div>
                    <div className="staff-card__dept-tag">
                      {member.department}
                    </div>
                  </div>

                  <div className="staff-card__body">
                    <div className="staff-card__designation-pill">
                      <Award size={13} aria-hidden />
                      <span>{getLocalizedDesignation(member)}</span>
                    </div>

                    <h2 className="staff-card__name">
                      {getLocalizedName(member)}
                    </h2>

                    {member.qualifications && (
                      <div className="staff-card__qual">
                        <BookOpen size={13} aria-hidden />
                        <span>{member.qualifications}</span>
                      </div>
                    )}

                    {member.experienceYears != null && member.experienceYears > 0 && (
                      <div className="staff-card__exp">
                        <Briefcase size={13} aria-hidden />
                        <span>
                          {member.experienceYears} {t.teachingStaff.years} {t.teachingStaff.experience}
                        </span>
                      </div>
                    )}

                    {getLocalizedBio(member) && (
                      <p className="staff-card__bio">
                        {getLocalizedBio(member)}
                      </p>
                    )}

                    {(member.contactEmail || member.contactPhone) && (
                      <div className="staff-card__contact">
                        {member.contactEmail && (
                          <a
                            href={`mailto:${member.contactEmail}`}
                            className="staff-contact-link"
                            aria-label={`Email ${member.name}`}
                          >
                            <Mail size={14} />
                            <span>{member.contactEmail}</span>
                          </a>
                        )}
                        {member.contactPhone && (
                          <a
                            href={`tel:${member.contactPhone}`}
                            className="staff-contact-link"
                            aria-label={`Call ${member.name}`}
                          >
                            <Phone size={14} />
                            <span>{member.contactPhone}</span>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

