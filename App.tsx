import { useState } from "react";
import {
  Home, Plus, FileText, User, LayoutGrid, List, BarChart2,
  Bell, Users, Settings, ChevronRight, ArrowLeft, CheckCircle,
  MapPin, Clock, AlertTriangle, Shield, Wifi, Camera, Upload,
  Menu, X,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Role = "ranger" | "manager";
type View =
  | "login"
  | "fr-home" | "fr-log-1" | "fr-log-2" | "fr-log-3"
  | "fr-confirm" | "fr-submissions" | "fr-incident" | "fr-profile"
  | "sr-dashboard" | "sr-incidents" | "sr-incident"
  | "sr-reports" | "sr-alerts" | "sr-users" | "sr-settings";

interface Incident {
  id: string;
  type: string;
  ranger: string;
  location: string;
  severity: string;
  status: string;
  logged: string;
  section: string;
}

// ─── Sample data ──────────────────────────────────────────────────────────────

const ALL_INCIDENTS: Incident[] = [
  { id: "INC-2026-0412", type: "Snare found", ranger: "T. Nkosi", location: "-25.1023, 31.5182", severity: "High", status: "Open", logged: "Today, 07:42", section: "Kruger South" },
  { id: "INC-2026-0405", type: "Fence breach", ranger: "M. Dlamini", location: "-25.0981, 31.5240", severity: "Medium", status: "Escalated", logged: "Yesterday", section: "Kruger South" },
  { id: "INC-2026-0398", type: "Wildlife sighting", ranger: "T. Nkosi", location: "-25.1102, 31.5090", severity: "Low", status: "Resolved", logged: "2 days ago", section: "Kruger South" },
  { id: "INC-2026-0391", type: "Poacher sighting", ranger: "K. Sithole", location: "-25.0945, 31.5310", severity: "High", status: "Resolved", logged: "4 days ago", section: "Kruger South" },
  { id: "INC-2026-0380", type: "Snare found", ranger: "T. Nkosi", location: "-25.1055, 31.5175", severity: "High", status: "Resolved", logged: "6 days ago", section: "Kruger South" },
  { id: "INC-2026-0375", type: "Vehicle in restricted area", ranger: "M. Dlamini", location: "-25.0820, 31.5450", severity: "Medium", status: "Open", logged: "7 days ago", section: "Kruger South" },
  { id: "INC-2026-0368", type: "Wildlife sighting", ranger: "P. Mokoena", location: "-25.1200, 31.5020", severity: "Low", status: "Resolved", logged: "9 days ago", section: "Kruger South" },
];

const RANGERS = ["T. Nkosi", "M. Dlamini", "K. Sithole", "P. Mokoena"];
const INCIDENT_TYPES = ["Snare found", "Fence breach", "Wildlife sighting", "Poacher sighting", "Vehicle in restricted area"];

// ─── Shared UI components ─────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const cls: Record<string, string> = {
    Open: "bg-red-50 text-red-700 border-red-200",
    Escalated: "bg-amber-50 text-amber-700 border-amber-200",
    Resolved: "bg-green-50 text-green-700 border-green-200",
    "On duty": "bg-green-50 text-green-700 border-green-200",
    "Off duty": "bg-gray-100 text-gray-500 border-gray-200",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${cls[status] ?? "bg-gray-100 text-gray-600 border-gray-200"}`}>
      {status}
    </span>
  );
}

function SeverityBadge({ severity }: { severity: string }) {
  const cls: Record<string, string> = {
    High: "text-red-600",
    Medium: "text-amber-600",
    Low: "text-green-600",
  };
  return <span className={`text-sm font-semibold ${cls[severity] ?? "text-gray-600"}`}>{severity}</span>;
}

// ─── Field Ranger: Bottom nav ─────────────────────────────────────────────────

function BottomNav({ active, onNav }: { active: View; onNav: (v: View) => void }) {
  const tabs: { label: string; icon: React.ElementType; view: View }[] = [
    { label: "Home", icon: Home, view: "fr-home" },
    { label: "Log", icon: Plus, view: "fr-log-1" },
    { label: "History", icon: FileText, view: "fr-submissions" },
    { label: "Profile", icon: User, view: "fr-profile" },
  ];
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex z-50" style={{ maxWidth: 448, margin: "0 auto" }}>
      {tabs.map(({ label, icon: Icon, view }) => {
        const isLog = label === "Log";
        const isActive = active === view;
        return (
          <button
            key={view}
            onClick={() => onNav(view)}
            className={`relative flex-1 flex flex-col items-center py-2 gap-0.5 text-xs font-medium transition-colors ${isActive ? "text-green-800" : "text-gray-400 hover:text-gray-600"}`}
          >
            {isLog ? (
              <span className="w-10 h-10 rounded-full bg-green-700 flex items-center justify-center shadow-md -mt-4">
                <Icon size={18} className="text-white" strokeWidth={2.5} />
              </span>
            ) : (
              <Icon size={20} strokeWidth={isActive ? 2 : 1.5} />
            )}
            <span className={isLog ? "text-green-700 font-semibold" : ""}>{label}</span>
          </button>
        );
      })}
    </nav>
  );
}

// ─── Field Ranger: Header ─────────────────────────────────────────────────────

function RangerHeader({ title, back, onBack }: { title?: string; back?: boolean; onBack?: () => void }) {
  return (
    <header className="bg-green-800 text-white px-4 py-3 flex items-center gap-3 flex-shrink-0">
      {back && onBack && (
        <button onClick={onBack} className="p-1 rounded hover:bg-green-700 transition-colors">
          <ArrowLeft size={18} />
        </button>
      )}
      <div className={`flex items-center gap-2 ${back ? "" : "flex-1"}`}>
        <Shield size={15} />
        <span className="font-bold text-sm tracking-wide">{title ?? "FRIMS"}</span>
      </div>
      {!back && (
        <div className="ml-auto text-right">
          <div className="text-xs font-medium">T. Nkosi · Kruger South</div>
          <div className="flex items-center justify-end gap-1">
            <Wifi size={10} className="text-green-300" />
            <span className="text-xs text-green-300">Synced</span>
          </div>
        </div>
      )}
    </header>
  );
}

// ─── Log incident: Step indicator ─────────────────────────────────────────────

function StepBar({ step }: { step: 1 | 2 | 3 }) {
  const steps = [
    { n: 1, label: "Details" },
    { n: 2, label: "Photo" },
    { n: 3, label: "Review" },
  ];
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-2.5">
      <div className="flex items-center gap-1.5">
        {steps.map(({ n, label }, i) => {
          const done = n < step;
          const active = n === step;
          return (
            <div key={n} className="flex items-center gap-1.5 min-w-0">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${done ? "bg-green-200 text-green-700" : active ? "bg-green-700 text-white" : "bg-gray-200 text-gray-400"}`}
              >
                {done ? "✓" : n}
              </div>
              <span className={`text-xs font-${active ? "semibold" : "normal"} ${active ? "text-green-700" : done ? "text-green-600" : "text-gray-400"} hidden sm:block`}>
                {label}
              </span>
              {i < 2 && <div className={`flex-1 h-px min-w-[16px] ${n < step ? "bg-green-200" : "bg-gray-200"}`} />}
            </div>
          );
        })}
      </div>
      <div className="text-xs text-gray-400 mt-1">Step {step} of 3 · {steps[step - 1].label}</div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [view, setView] = useState<View>("login");
  const [, setRole] = useState<Role | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);

  // Form state
  const [incidentType, setIncidentType] = useState("Snare found");
  const [incidentNotes] = useState("Fresh wire snare near waterhole, signs of recent activity.");

  // Filters
  const [statusFilter, setStatusFilter] = useState("All");
  const [timeFilter, setTimeFilter] = useState("Last 30 days");

  // SR triage state
  const [editStatus, setEditStatus] = useState("");
  const [editPriority, setEditPriority] = useState("");
  const [editAssignee, setEditAssignee] = useState("");
  const [editNotes, setEditNotes] = useState("");
  const [saved, setSaved] = useState(false);

  const nav = (v: View) => { setView(v); setSaved(false); };

  const openIncident = (inc: Incident, dest: "fr-incident" | "sr-incident") => {
    setSelectedIncident(inc);
    setEditStatus(inc.status);
    setEditPriority(inc.severity);
    setEditAssignee(inc.ranger);
    setEditNotes("");
    setSaved(false);
    nav(dest);
  };

  // ── LOGIN ──────────────────────────────────────────────────────────────────

  if (view === "login") {
    return (
      <div className="min-h-screen bg-[#f2f2ef] flex flex-col items-center justify-center p-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 bg-green-800 rounded-lg flex items-center justify-center shadow-sm">
                <Shield size={17} className="text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-gray-900">FRIMS</span>
            </div>
            <p className="text-sm text-gray-600 font-medium">Field Ranger & Incident Management System</p>
            <p className="text-xs text-gray-400 mt-1">Kruger National Park · Section Ranger Services</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4 shadow-sm">
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">Username</label>
                <input
                  type="text"
                  defaultValue="t.nkosi"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">Password</label>
                <input
                  type="password"
                  defaultValue="password"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                />
              </div>
            </div>

            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Sign in as</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => { setRole("ranger"); nav("fr-home"); }}
                className="flex flex-col items-center gap-2 p-4 border-2 border-gray-200 rounded-xl hover:border-green-600 hover:bg-green-50 transition-all group cursor-pointer"
              >
                <span className="text-2xl">🧭</span>
                <span className="text-sm font-semibold text-gray-800 group-hover:text-green-800">Field Ranger</span>
                <span className="text-xs text-gray-400 text-center leading-tight">Log & track incidents</span>
              </button>
              <button
                onClick={() => { setRole("manager"); nav("sr-dashboard"); }}
                className="flex flex-col items-center gap-2 p-4 border-2 border-gray-200 rounded-xl hover:border-green-600 hover:bg-green-50 transition-all group cursor-pointer"
              >
                <span className="text-2xl">🖥️</span>
                <span className="text-sm font-semibold text-gray-800 group-hover:text-green-800">Section Ranger</span>
                <span className="text-xs text-gray-400 text-center leading-tight">Monitor & manage</span>
              </button>
            </div>
          </div>

          <p className="text-center text-xs text-gray-400">EcoGuard Solutions · INSY7315 Task 1 Prototype</p>
        </div>
      </div>
    );
  }

  // ── FIELD RANGER FLOW ──────────────────────────────────────────────────────

  const myIncidents = ALL_INCIDENTS.filter(i => i.ranger === "T. Nkosi");

  if (view === "fr-home") {
    return (
      <div className="min-h-screen bg-[#f2f2ef] flex flex-col max-w-[448px] mx-auto relative" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <RangerHeader />

        <div className="flex-1 overflow-auto pb-24 px-4 py-4 space-y-4">
          <button
            onClick={() => nav("fr-log-1")}
            className="w-full bg-green-700 hover:bg-green-800 active:bg-green-900 text-white rounded-xl py-4 flex items-center justify-center gap-2.5 font-semibold text-base transition-colors shadow-sm"
          >
            <Plus size={20} strokeWidth={2.5} />
            Log Incident
          </button>

          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Logged this week", value: "6", color: "text-gray-900" },
              { label: "Open", value: "2", color: "text-red-600" },
              { label: "Resolved", value: "4", color: "text-green-700" },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-white rounded-xl border border-gray-200 p-3 text-center shadow-sm">
                <div className={`text-2xl font-bold ${color}`}>{value}</div>
                <div className="text-xs text-gray-500 mt-0.5 leading-tight">{label}</div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-900">Recent Submissions</span>
              <button onClick={() => nav("fr-submissions")} className="text-xs text-green-700 hover:text-green-800 font-semibold">
                View all →
              </button>
            </div>
            <div className="divide-y divide-gray-100">
              {myIncidents.slice(0, 3).map((inc) => (
                <button
                  key={inc.id}
                  onClick={() => openIncident(inc, "fr-incident")}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-gray-900 truncate">{inc.type}</div>
                      <div className="flex items-center gap-1 mt-0.5">
                        <MapPin size={10} className="text-gray-400 flex-shrink-0" />
                        <span className="text-[11px] text-gray-400" style={{ fontFamily: "'DM Mono', monospace" }}>{inc.location}</span>
                      </div>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Clock size={10} className="text-gray-400 flex-shrink-0" />
                        <span className="text-[11px] text-gray-400">{inc.logged}</span>
                      </div>
                    </div>
                    <StatusBadge status={inc.status} />
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <div className="text-sm font-semibold text-gray-900 mb-3">Section Overview</div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Team on duty</span>
                <span className="font-semibold text-gray-900">3 rangers</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Last sync</span>
                <span className="font-semibold text-gray-900">2 min ago</span>
              </div>
            </div>
          </div>
        </div>

        <BottomNav active="fr-home" onNav={nav} />
      </div>
    );
  }

  if (view === "fr-log-1") {
    return (
      <div className="min-h-screen bg-[#f2f2ef] flex flex-col max-w-[448px] mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <RangerHeader back title="Log Incident" onBack={() => nav("fr-home")} />
        <StepBar step={1} />

        <div className="flex-1 overflow-auto pb-24 px-4 py-4 space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2.5">Incident Type</label>
              <div className="space-y-2">
                {INCIDENT_TYPES.map((t) => (
                  <label key={t} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="inctype"
                      value={t}
                      checked={incidentType === t}
                      onChange={() => setIncidentType(t)}
                      className="accent-green-700 w-4 h-4"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-gray-900">{t}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">GPS Location</label>
              <div className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg">
                <MapPin size={14} className="text-green-700 flex-shrink-0" />
                <span className="text-sm text-gray-700 flex-1" style={{ fontFamily: "'DM Mono', monospace" }}>-25.1023, 31.5182</span>
                <span className="text-xs font-semibold text-green-700 bg-green-50 px-1.5 py-0.5 rounded">Auto</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">Notes</label>
              <textarea
                rows={4}
                defaultValue={incidentNotes}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent resize-none"
                placeholder="Describe the incident..."
              />
            </div>
          </div>

          {/* Location context sidebar panel (shown inline on mobile) */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <div className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Location Context</div>
            <div className="text-xs text-gray-500 mb-3">Nearby recent activity</div>
            <div className="space-y-2">
              {[
                { type: "Fence breach", location: "-25.0981, 31.5240", time: "Yesterday", status: "Escalated" },
                { type: "Wildlife sighting", location: "-25.1102, 31.5090", time: "2 days ago", status: "Resolved" },
              ].map((item, i) => (
                <div key={i} className="border border-gray-100 rounded-lg p-2.5 space-y-1">
                  <div className="text-xs font-semibold text-gray-800">{item.type}</div>
                  <div className="text-[10px] text-gray-400" style={{ fontFamily: "'DM Mono', monospace" }}>{item.location}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-400">{item.time}</span>
                    <StatusBadge status={item.status} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => nav("fr-home")}
              className="px-4 py-2.5 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={() => nav("fr-log-2")}
              className="flex-1 bg-green-700 hover:bg-green-800 text-white px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              Next: Attach Photo <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <BottomNav active="fr-log-1" onNav={nav} />
      </div>
    );
  }

  if (view === "fr-log-2") {
    return (
      <div className="min-h-screen bg-[#f2f2ef] flex flex-col max-w-[448px] mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <RangerHeader back title="Log Incident" onBack={() => nav("fr-log-1")} />
        <StepBar step={2} />

        <div className="flex-1 overflow-auto pb-24 px-4 py-4 space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">Evidence / Photo</label>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center gap-3 bg-gray-50">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                <Camera size={22} className="text-gray-400" />
              </div>
              <div className="text-center">
                <div className="text-sm font-semibold text-gray-700">Attach photo evidence</div>
                <div className="text-xs text-gray-400 mt-1">PNG, JPG — up to 10 MB</div>
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-green-700 text-white text-xs font-semibold rounded-lg hover:bg-green-800 transition-colors">
                  <Camera size={13} /> Camera
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 text-gray-600 text-xs font-semibold rounded-lg hover:bg-gray-50 transition-colors">
                  <Upload size={13} /> Upload
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-2.5">Photo is optional but strongly recommended for snare and poacher incidents.</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => nav("fr-log-1")}
              className="flex items-center gap-1.5 px-4 py-2.5 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              <ArrowLeft size={14} /> Back
            </button>
            <button
              onClick={() => nav("fr-log-3")}
              className="flex-1 bg-green-700 hover:bg-green-800 text-white px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              Next: Review <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <BottomNav active="fr-log-1" onNav={nav} />
      </div>
    );
  }

  if (view === "fr-log-3") {
    const reviewRows = [
      { label: "Type", value: incidentType },
      { label: "Location", value: "-25.1023, 31.5182", mono: true },
      { label: "Reporter", value: "T. Nkosi" },
      { label: "Date / Time", value: "14 Aug 2026, 07:42" },
      { label: "Section", value: "Kruger South" },
      { label: "Notes", value: incidentNotes },
      { label: "Photo", value: "No photo attached" },
    ];
    return (
      <div className="min-h-screen bg-[#f2f2ef] flex flex-col max-w-[448px] mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <RangerHeader back title="Log Incident" onBack={() => nav("fr-log-2")} />
        <StepBar step={3} />

        <div className="flex-1 overflow-auto pb-24 px-4 py-4 space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
              <div className="text-sm font-semibold text-gray-800">Review Incident Details</div>
            </div>
            <div className="divide-y divide-gray-100">
              {reviewRows.map(({ label, value, mono }) => (
                <div key={label} className="flex px-4 py-3 gap-4">
                  <span className="text-xs font-semibold text-gray-500 w-20 flex-shrink-0 pt-0.5 uppercase tracking-wide">{label}</span>
                  <span className={`text-sm text-gray-900 leading-relaxed ${mono ? "" : ""}`} style={mono ? { fontFamily: "'DM Mono', monospace" } : {}}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => nav("fr-log-2")}
              className="flex items-center gap-1.5 px-4 py-2.5 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              <ArrowLeft size={14} /> Back
            </button>
            <button
              onClick={() => nav("fr-confirm")}
              className="flex-1 bg-green-700 hover:bg-green-800 text-white px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              Submit Incident
            </button>
          </div>
        </div>

        <BottomNav active="fr-log-1" onNav={nav} />
      </div>
    );
  }

  if (view === "fr-confirm") {
    return (
      <div className="min-h-screen bg-[#f2f2ef] flex flex-col items-center justify-center px-4 max-w-[448px] mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 w-full text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={30} className="text-green-700" />
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-1">Incident Submitted</h2>
          <p className="text-sm text-gray-500 mb-6 leading-relaxed">
            Your incident has been logged and synced to the section ranger for review.
          </p>

          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left border border-gray-100 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Reference</span>
              <span className="font-bold text-gray-900" style={{ fontFamily: "'DM Mono', monospace" }}>INC-2026-0413</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Type</span>
              <span className="text-gray-900 font-medium">{incidentType}</span>
            </div>
            <div className="flex justify-between text-sm items-center">
              <span className="text-gray-500">Status</span>
              <StatusBadge status="Open" />
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Synced</span>
              <span className="text-green-700 font-semibold">Yes</span>
            </div>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => openIncident(ALL_INCIDENTS[0], "fr-incident")}
              className="w-full py-3 bg-green-700 text-white rounded-xl text-sm font-semibold hover:bg-green-800 transition-colors"
            >
              View Incident Details
            </button>
            <button
              onClick={() => nav("fr-submissions")}
              className="w-full py-3 border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              My Submissions
            </button>
            <button
              onClick={() => nav("fr-home")}
              className="w-full py-2.5 text-gray-400 text-sm hover:text-gray-600 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (view === "fr-incident") {
    const inc = selectedIncident ?? ALL_INCIDENTS[0];
    return (
      <div className="min-h-screen bg-[#f2f2ef] flex flex-col max-w-[448px] mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <RangerHeader back title="Incident Details" onBack={() => nav("fr-submissions")} />

        <div className="flex-1 overflow-auto pb-24 px-4 py-4 space-y-3">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500" style={{ fontFamily: "'DM Mono', monospace" }}>{inc.id}</span>
              <StatusBadge status={inc.status} />
            </div>
            <div className="divide-y divide-gray-100">
              {[
                { label: "Type", value: inc.type },
                { label: "Location", value: inc.location, mono: true },
                { label: "Reporter", value: inc.ranger },
                { label: "Assigned", value: inc.ranger },
                { label: "Logged", value: inc.logged },
                { label: "Severity", value: inc.severity },
                { label: "Section", value: inc.section },
              ].map(({ label, value, mono }) => (
                <div key={label} className="flex px-4 py-2.5 gap-4">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide w-20 flex-shrink-0 pt-0.5">{label}</span>
                  <span className={`text-sm text-gray-900`} style={mono ? { fontFamily: "'DM Mono', monospace" } : {}}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Notes</div>
            <p className="text-sm text-gray-700 leading-relaxed">
              Fresh wire snare near waterhole, signs of recent activity. Area shows evidence of regular foot traffic.
              Snare removed and secured as evidence.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Evidence</div>
            <div className="flex items-center gap-2 text-gray-400">
              <Camera size={14} />
              <span className="text-xs">No photos attached</span>
            </div>
          </div>
        </div>

        <BottomNav active="fr-home" onNav={nav} />
      </div>
    );
  }

  if (view === "fr-submissions") {
    const filtered = myIncidents.filter(i => statusFilter === "All" || i.status === statusFilter);
    return (
      <div className="min-h-screen bg-[#f2f2ef] flex flex-col max-w-[448px] mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <RangerHeader />

        <div className="flex-1 overflow-auto pb-24">
          <div className="px-4 py-3 bg-white border-b border-gray-200 flex items-center justify-between">
            <div>
              <div className="text-sm font-bold text-gray-900">My Submissions</div>
              <div className="text-xs text-gray-500">12 total · last 30 days</div>
            </div>
            <button
              onClick={() => nav("fr-log-1")}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-green-700 text-white text-xs font-semibold rounded-lg hover:bg-green-800 transition-colors"
            >
              <Plus size={12} strokeWidth={2.5} /> Log Incident
            </button>
          </div>

          <div className="px-4 py-2.5 bg-white border-b border-gray-100 space-y-2">
            <div className="flex gap-1.5 flex-wrap">
              {["All", "Open", "Escalated", "Resolved"].map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-2.5 py-1 text-xs rounded-lg font-semibold transition-colors ${statusFilter === s ? "bg-green-700 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {["Last 30 days", "Last 7 days", "All time"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeFilter(t)}
                  className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors ${timeFilter === t ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="px-4 py-3 space-y-2">
            {filtered.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <FileText size={32} className="mx-auto mb-2 opacity-40" />
                <div className="text-sm">No incidents match this filter</div>
              </div>
            ) : (
              filtered.map((inc) => (
                <button
                  key={inc.id}
                  onClick={() => openIncident(inc, "fr-incident")}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-left hover:border-green-300 hover:shadow-sm transition-all"
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span className="text-sm font-semibold text-gray-900">{inc.type}</span>
                    <StatusBadge status={inc.status} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-gray-400" style={{ fontFamily: "'DM Mono', monospace" }}>{inc.id}</span>
                    <span className="text-[11px] text-gray-400">{inc.logged}</span>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        <BottomNav active="fr-submissions" onNav={nav} />
      </div>
    );
  }

  if (view === "fr-profile") {
    return (
      <div className="min-h-screen bg-[#f2f2ef] flex flex-col max-w-[448px] mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <RangerHeader />
        <div className="flex-1 overflow-auto pb-24 px-4 py-4 space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
              <User size={28} className="text-green-700" />
            </div>
            <div className="font-bold text-gray-900 text-lg">T. Nkosi</div>
            <div className="text-sm text-gray-500">Field Ranger</div>
            <div className="text-xs text-gray-400 mt-1">Kruger South · Badge #2847</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden divide-y divide-gray-100">
            {[
              "Account settings",
              "Notification preferences",
              "Offline data",
              "About FRIMS",
            ].map((item) => (
              <button key={item} className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 flex items-center justify-between hover:bg-gray-50 transition-colors">
                {item}
                <ChevronRight size={14} className="text-gray-400" />
              </button>
            ))}
            <button className="w-full text-left px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors" onClick={() => nav("login")}>
              Sign out
            </button>
          </div>
        </div>
        <BottomNav active="fr-profile" onNav={nav} />
      </div>
    );
  }

  // ── SECTION RANGER / MANAGER FLOW ─────────────────────────────────────────

  const srNavItems: { label: string; icon: React.ElementType; view: View; badge?: number }[] = [
    { label: "Dashboard", icon: LayoutGrid, view: "sr-dashboard" },
    { label: "Incidents", icon: List, view: "sr-incidents" },
    { label: "Reports", icon: BarChart2, view: "sr-reports" },
    { label: "Alerts", icon: Bell, view: "sr-alerts", badge: 3 },
    { label: "Users", icon: Users, view: "sr-users" },
    { label: "Settings", icon: Settings, view: "sr-settings" },
  ];

  const Sidebar = () => (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside
        className={`fixed lg:static z-40 h-full w-56 bg-white border-r border-gray-200 flex flex-col transition-transform duration-200 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="px-4 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5 mb-0.5">
            <div className="w-7 h-7 bg-green-800 rounded-md flex items-center justify-center">
              <Shield size={13} className="text-white" />
            </div>
            <span className="font-bold text-sm tracking-wide text-gray-900">FRIMS</span>
          </div>
          <div className="text-[11px] text-gray-500 mt-1">Kruger South Section</div>
        </div>
        <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
          {srNavItems.map(({ label, icon: Icon, view: v, badge }) => (
            <button
              key={v}
              onClick={() => { nav(v); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${view === v ? "bg-green-50 text-green-800" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"}`}
            >
              <Icon size={16} strokeWidth={view === v ? 2 : 1.5} />
              <span className="flex-1 text-left">{label}</span>
              {badge && (
                <span className="bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  {badge}
                </span>
              )}
            </button>
          ))}
        </nav>
        <div className="px-4 py-3 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center">
              <User size={13} className="text-green-700" />
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-900">S. Mahlangu</div>
              <div className="text-[10px] text-gray-500">Section Ranger</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );

  const SRHeader = ({ title }: { title?: string }) => (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 flex-shrink-0">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
      >
        {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
      </button>
      <div className="flex items-center gap-2">
        <div className="lg:hidden w-6 h-6 bg-green-800 rounded flex items-center justify-center">
          <Shield size={11} className="text-white" />
        </div>
        <span className="font-bold text-sm tracking-wide text-gray-900 lg:hidden">FRIMS</span>
        {title && <span className="hidden lg:block text-sm font-semibold text-gray-700">{title}</span>}
      </div>
    </header>
  );

  if (view === "sr-dashboard") {
    const byType = [
      { type: "Sighting", count: 58, bar: "bg-blue-500" },
      { type: "Snare", count: 34, bar: "bg-red-500" },
      { type: "Fence", count: 21, bar: "bg-amber-500" },
      { type: "Poacher", count: 12, bar: "bg-purple-500" },
    ];
    return (
      <div className="flex h-screen bg-[#f2f2ef] overflow-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <SRHeader />
          <main className="flex-1 overflow-auto px-4 lg:px-6 py-5 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-gray-900">Incident Dashboard</h1>
                <p className="text-sm text-gray-500">Kruger South · August 2026</p>
              </div>
              <button
                onClick={() => nav("sr-incidents")}
                className="text-sm text-green-700 hover:text-green-800 font-semibold hidden sm:block"
              >
                View all incidents →
              </button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { label: "Open", value: "18", color: "text-red-600" },
                { label: "Escalated", value: "5", color: "text-amber-600" },
                { label: "Resolved (MTD)", value: "142", color: "text-green-700" },
                { label: "Total (MTD)", value: "165", color: "text-gray-900" },
              ].map(({ label, value, color }) => (
                <div key={label} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                  <div className={`text-3xl font-bold ${color}`}>{value}</div>
                  <div className="text-xs text-gray-500 mt-1 font-medium">{label}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-900">Live Incident Map</span>
                  <span className="text-[10px] font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded-full border border-green-200">Live</span>
                </div>
                <div className="h-44 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex flex-col items-center justify-center gap-2 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-30" style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(0,100,0,0.05) 20px, rgba(0,100,0,0.05) 21px), repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(0,100,0,0.05) 20px, rgba(0,100,0,0.05) 21px)" }} />
                  <div className="absolute top-8 left-12 w-3 h-3 bg-red-500 rounded-full shadow-sm animate-pulse" />
                  <div className="absolute top-16 right-16 w-3 h-3 bg-amber-500 rounded-full shadow-sm" />
                  <div className="absolute bottom-10 left-20 w-3 h-3 bg-green-500 rounded-full shadow-sm" />
                  <div className="absolute bottom-6 right-10 w-3 h-3 bg-red-500 rounded-full shadow-sm" />
                  <div className="absolute top-6 right-8 w-2 h-2 bg-green-500 rounded-full" />
                  <MapPin size={20} className="text-green-700 relative z-10" />
                  <span className="text-xs text-gray-500 font-medium relative z-10">Kruger South — Interactive map</span>
                  <div className="flex gap-3 text-[10px] relative z-10">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500 inline-block" />Open</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />Escalated</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500 inline-block" />Resolved</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100">
                  <span className="text-sm font-semibold text-gray-900">Incidents by Type — this month</span>
                </div>
                <div className="p-4 space-y-3">
                  {byType.map(({ type, count, bar }) => (
                    <div key={type} className="flex items-center gap-3">
                      <div className="w-16 text-xs font-medium text-gray-600">{type}</div>
                      <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div className={`${bar} h-2 rounded-full transition-all`} style={{ width: `${(count / 58) * 100}%` }} />
                      </div>
                      <div className="w-6 text-sm font-bold text-gray-900 text-right">{count}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-900">Recent Incidents</span>
                <button onClick={() => nav("sr-incidents")} className="text-xs text-green-700 font-semibold hover:text-green-800">View all →</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Ranger</th>
                      <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Location</th>
                      <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Severity</th>
                      <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {ALL_INCIDENTS.slice(0, 5).map((inc) => (
                      <tr
                        key={inc.id}
                        className="hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => openIncident(inc, "sr-incident")}
                      >
                        <td className="px-4 py-3 font-semibold text-gray-900">{inc.type}</td>
                        <td className="px-4 py-3 text-gray-600">{inc.ranger}</td>
                        <td className="px-4 py-3 text-xs text-gray-400 hidden md:table-cell" style={{ fontFamily: "'DM Mono', monospace" }}>{inc.location}</td>
                        <td className="px-4 py-3"><SeverityBadge severity={inc.severity} /></td>
                        <td className="px-4 py-3"><StatusBadge status={inc.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (view === "sr-incidents") {
    const filtered = ALL_INCIDENTS.filter(i => statusFilter === "All" || i.status === statusFilter);
    return (
      <div className="flex h-screen bg-[#f2f2ef] overflow-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <SRHeader />
          <main className="flex-1 overflow-auto px-4 lg:px-6 py-5 space-y-4">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Incidents</h1>
              <p className="text-sm text-gray-500">All incidents — Kruger South</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 flex items-center gap-3 flex-wrap shadow-sm">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Status:</span>
              {["All", "Open", "Escalated", "Resolved"].map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-3 py-1 text-xs rounded-lg font-semibold transition-colors ${statusFilter === s ? "bg-green-700 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Reference</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Ranger</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Location</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Logged</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Severity</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filtered.map((inc) => (
                      <tr
                        key={inc.id}
                        className="hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => openIncident(inc, "sr-incident")}
                      >
                        <td className="px-4 py-3 text-xs text-gray-400" style={{ fontFamily: "'DM Mono', monospace" }}>{inc.id}</td>
                        <td className="px-4 py-3 font-semibold text-gray-900">{inc.type}</td>
                        <td className="px-4 py-3 text-gray-600 hidden sm:table-cell">{inc.ranger}</td>
                        <td className="px-4 py-3 text-xs text-gray-400 hidden lg:table-cell" style={{ fontFamily: "'DM Mono', monospace" }}>{inc.location}</td>
                        <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{inc.logged}</td>
                        <td className="px-4 py-3"><SeverityBadge severity={inc.severity} /></td>
                        <td className="px-4 py-3"><StatusBadge status={inc.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filtered.length === 0 && (
                <div className="py-16 text-center text-gray-400">
                  <List size={28} className="mx-auto mb-2 opacity-40" />
                  <div className="text-sm">No incidents match this filter</div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (view === "sr-incident") {
    const inc = selectedIncident ?? ALL_INCIDENTS[0];
    return (
      <div className="flex h-screen bg-[#f2f2ef] overflow-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <SRHeader />
          <main className="flex-1 overflow-auto px-4 lg:px-6 py-5 space-y-4">
            <div className="flex items-center gap-2 text-sm">
              <button
                onClick={() => nav("sr-incidents")}
                className="text-gray-400 hover:text-gray-700 flex items-center gap-1 transition-colors"
              >
                <ArrowLeft size={14} /> Incidents
              </button>
              <span className="text-gray-300">/</span>
              <span className="text-gray-600" style={{ fontFamily: "'DM Mono', monospace" }}>{inc.id}</span>
            </div>

            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h1 className="text-xl font-bold text-gray-900">{inc.type}</h1>
                <div className="flex items-center flex-wrap gap-2.5 mt-1.5">
                  <StatusBadge status={editStatus || inc.status} />
                  <SeverityBadge severity={editPriority || inc.severity} />
                  <span className="text-sm text-gray-400">{inc.logged}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 space-y-4">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="text-sm font-semibold text-gray-900">Incident Details</div>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {[
                      { label: "Reference", value: inc.id, mono: true },
                      { label: "Type", value: inc.type },
                      { label: "Reporter", value: inc.ranger },
                      { label: "Location", value: inc.location, mono: true },
                      { label: "Date logged", value: inc.logged },
                      { label: "Section", value: inc.section },
                    ].map(({ label, value, mono }) => (
                      <div key={label} className="flex px-4 py-3 gap-6">
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider w-24 flex-shrink-0 pt-0.5">{label}</span>
                        <span className="text-sm text-gray-900" style={mono ? { fontFamily: "'DM Mono', monospace" } : {}}>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Notes</div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Fresh wire snare near waterhole, signs of recent activity. Area shows evidence of regular foot traffic.
                    Snare removed and secured as evidence. Patrol frequency should be increased in this sector.
                  </p>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Activity Log</div>
                  <div className="space-y-3">
                    {[
                      { time: "Today, 07:42", actor: "T. Nkosi", action: "Incident logged" },
                      { time: "Today, 08:15", actor: "S. Mahlangu", action: "Reviewed and escalated" },
                      ...(saved ? [{ time: "Today, 08:30", actor: "S. Mahlangu", action: `Status updated to "${editStatus}"` }] : []),
                    ].map((entry, i) => (
                      <div key={i} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className="w-2 h-2 rounded-full bg-green-400 mt-1 flex-shrink-0" />
                          {i < 1 && <div className="w-px flex-1 bg-gray-200 my-1" />}
                        </div>
                        <div className="pb-2">
                          <div className="text-sm font-semibold text-gray-900">{entry.action}</div>
                          <div className="text-xs text-gray-400 mt-0.5">{entry.actor} · {entry.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
                  <div className="text-sm font-semibold text-gray-900 mb-3">Update Incident</div>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Status</label>
                      <select
                        value={editStatus || inc.status}
                        onChange={(e) => setEditStatus(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600"
                      >
                        <option>Open</option>
                        <option>Escalated</option>
                        <option>Resolved</option>
                        <option>Closed</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Priority</label>
                      <select
                        value={editPriority || inc.severity}
                        onChange={(e) => setEditPriority(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600"
                      >
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Assign Ranger</label>
                      <select
                        value={editAssignee || inc.ranger}
                        onChange={(e) => setEditAssignee(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600"
                      >
                        {RANGERS.map((r) => <option key={r}>{r}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Update Notes</label>
                      <textarea
                        rows={3}
                        value={editNotes}
                        onChange={(e) => setEditNotes(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600 resize-none"
                        placeholder="Add update notes..."
                      />
                    </div>
                    {saved ? (
                      <div className="w-full py-2.5 bg-green-50 border border-green-200 text-green-800 rounded-xl text-sm font-semibold flex items-center justify-center gap-2">
                        <CheckCircle size={15} /> Changes saved
                      </div>
                    ) : (
                      <button
                        onClick={() => setSaved(true)}
                        className="w-full bg-green-700 hover:bg-green-800 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors"
                      >
                        Save Changes
                      </button>
                    )}
                  </div>
                </div>

                {inc.severity === "High" && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                    <div className="flex items-start gap-2">
                      <AlertTriangle size={14} className="text-amber-600 flex-shrink-0 mt-0.5" />
                      <div className="text-xs text-amber-800">
                        <div className="font-bold mb-0.5">High severity incident</div>
                        <div>Review and assign within 2 hours of logging.</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (view === "sr-reports") {
    return (
      <div className="flex h-screen bg-[#f2f2ef] overflow-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <SRHeader />
          <main className="flex-1 overflow-auto px-4 lg:px-6 py-5 space-y-4">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Reports</h1>
              <p className="text-sm text-gray-500">Kruger South · August 2026</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { title: "Monthly Incident Summary", desc: "Totals, trends, and resolution rates by type" },
                { title: "Ranger Activity Report", desc: "Incidents logged and resolved per ranger" },
                { title: "Snare & Poaching Report", desc: "Detailed snare and poacher incident breakdown" },
                { title: "Patrol Coverage Map", desc: "GPS patrol data by sector for the month" },
              ].map(({ title, desc }) => (
                <button
                  key={title}
                  className="bg-white border border-gray-200 rounded-xl p-4 text-left hover:border-green-300 hover:shadow-sm transition-all group flex items-start justify-between gap-3"
                >
                  <div>
                    <div className="text-sm font-semibold text-gray-900 mb-0.5">{title}</div>
                    <div className="text-xs text-gray-400 leading-relaxed">{desc}</div>
                  </div>
                  <ChevronRight size={15} className="text-gray-400 group-hover:text-green-700 transition-colors flex-shrink-0 mt-0.5" />
                </button>
              ))}
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (view === "sr-alerts") {
    return (
      <div className="flex h-screen bg-[#f2f2ef] overflow-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <SRHeader />
          <main className="flex-1 overflow-auto px-4 lg:px-6 py-5 space-y-4">
            <h1 className="text-xl font-bold text-gray-900">Alerts <span className="ml-1 text-sm font-semibold text-red-600 bg-red-50 px-1.5 py-0.5 rounded-full">3</span></h1>
            <div className="space-y-2">
              {[
                { type: "High priority incident unassigned", ref: "INC-2026-0412", time: "Today, 07:42", level: "high" as const },
                { type: "Escalated incident requires review", ref: "INC-2026-0405", time: "Yesterday, 14:20", level: "medium" as const },
                { type: "Patrol gap detected — Sector 7", ref: "", time: "2 hours ago", level: "medium" as const },
              ].map((alert, i) => (
                <div
                  key={i}
                  className={`bg-white rounded-xl border shadow-sm p-4 flex items-start gap-3 ${alert.level === "high" ? "border-red-200" : "border-amber-200"}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${alert.level === "high" ? "bg-red-50" : "bg-amber-50"}`}>
                    <AlertTriangle size={14} className={alert.level === "high" ? "text-red-500" : "text-amber-500"} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-gray-900">{alert.type}</div>
                    {alert.ref && (
                      <div className="text-xs text-gray-400 mt-0.5" style={{ fontFamily: "'DM Mono', monospace" }}>{alert.ref}</div>
                    )}
                    <div className="text-xs text-gray-400 mt-0.5">{alert.time}</div>
                  </div>
                  <button className="text-xs text-gray-400 hover:text-gray-600 font-medium flex-shrink-0">Dismiss</button>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (view === "sr-users") {
    return (
      <div className="flex h-screen bg-[#f2f2ef] overflow-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <SRHeader />
          <main className="flex-1 overflow-auto px-4 lg:px-6 py-5 space-y-4">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Team / Rangers</h1>
              <p className="text-sm text-gray-500">Kruger South Section</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Role</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Badge</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Incidents (MTD)</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { name: "T. Nkosi", role: "Field Ranger", badge: "#2847", incidents: 6, status: "On duty" },
                    { name: "M. Dlamini", role: "Field Ranger", badge: "#2851", incidents: 4, status: "On duty" },
                    { name: "K. Sithole", role: "Field Ranger", badge: "#2839", incidents: 3, status: "Off duty" },
                    { name: "P. Mokoena", role: "Field Ranger", badge: "#2862", incidents: 2, status: "On duty" },
                  ].map((r) => (
                    <tr key={r.badge} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                            <User size={13} className="text-green-700" />
                          </div>
                          <span className="font-semibold text-gray-900">{r.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-600 hidden sm:table-cell">{r.role}</td>
                      <td className="px-4 py-3 text-xs text-gray-400 hidden md:table-cell" style={{ fontFamily: "'DM Mono', monospace" }}>{r.badge}</td>
                      <td className="px-4 py-3 font-semibold text-gray-900">{r.incidents}</td>
                      <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (view === "sr-settings") {
    return (
      <div className="flex h-screen bg-[#f2f2ef] overflow-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <SRHeader />
          <main className="flex-1 overflow-auto px-4 lg:px-6 py-5 space-y-4">
            <h1 className="text-xl font-bold text-gray-900">Settings</h1>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden divide-y divide-gray-100 max-w-lg">
              {[
                "Section details",
                "Notification settings",
                "User management",
                "Data & sync",
                "About FRIMS",
              ].map((item) => (
                <button
                  key={item}
                  className="w-full text-left px-4 py-3.5 text-sm font-medium text-gray-700 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  {item}
                  <ChevronRight size={14} className="text-gray-400" />
                </button>
              ))}
              <button
                onClick={() => nav("login")}
                className="w-full text-left px-4 py-3.5 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
              >
                Sign out
              </button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return null;
}
