"use client";

import { useState, useEffect } from "react";
import { CandidateHeader } from "./components/candidate-header";
import { CandidateNavigation } from "./components/candidate-navigation";
import { CandidateToolbar } from "./components/candidate-toolbar";
import { ProfileSection } from "./components/profile-section";
import { FormsSection } from "./components/forms-section";
import { FilesSection } from "./components/files-section";
import type { Candidate } from "./types/candidate";
import { HeimdallSection } from "./components/heimdall-section";
import { CommentsSection } from "./components/comments-section";
import { MeetingsSection } from "./components/meetings-section";

const mockData: Candidate = {
  id: 1,
  candidate_name: "Julián Bracamonte",
  candidate_email: "julian.bracamonte@email.com",
  candidate_phone: "+54 11 1234-5678",
  position: "Desarrollador Full Stack",
  cv_document: {
    filename: "CV_Julian_Bracamonte.pdf",
    upload_date: "2025-01-15T14:30:00Z",
    file_size: "2.4 MB",
    url: "/placeholder.svg?height=800&width=600",
  },
  has_category: false,
  files: [
    {
      id: "4867f96d-9fa2-4f70-af66-931bde6f9c81",
      filename: "linkedin_profile_1986180785465432.pdf",
      description: "",
      uploaded_at: "2025-04-11 17:00:42",
      url: "https://s3-buscafacil-arg-sa-01.s3.amazonaws.com/cvs/linkedin_profile_1986180785465432.pdf",
    },
    {
      id: "a123b456-7890-1234-5678-9abcdef01234",
      filename: "portfolio_julian_bracamonte.pdf",
      description: "Portfolio de proyectos desarrollados",
      uploaded_at: "2025-04-10 14:30:15",
      url: "https://s3-buscafacil-arg-sa-01.s3.amazonaws.com/cvs/portfolio_julian_bracamonte.pdf",
    },
    {
      id: "c789d012-3456-7890-1234-56789abcdef0",
      filename: "certificado_react_developer.pdf",
      description: "Certificación en React Development",
      uploaded_at: "2025-04-09 10:15:30",
      url: "https://s3-buscafacil-arg-sa-01.s3.amazonaws.com/cvs/certificado_react_developer.pdf",
    },
  ],
  scoreboards: [
    {
      id: "5809a7f6-bcb1-4e66-bfa1-78c113d0dd89",
      template_name: "Formulario de fecha de entrevista",
      recruiter_name: "Julian",
      to_complete: false,
      created_at: "2025-01-19T10:30:00Z",
      entries: [
        {
          field_name: "Fecha y hora de entrevista",
          field_type: "datetime",
          value: "2025-05-27 22:08",
        },
        {
          field_name: "Notas adicionales",
          field_type: "textarea",
          value:
            "Candidato muy prometedor, buena comunicación y experiencia técnica sólida. Mostró gran interés en el proyecto y las tecnologías que utilizamos.",
        },
      ],
    },
    {
      id: "df77e826-45c4-4518-8d5a-32a2b5392795",
      template_name: "Screening MODELO BELEN",
      recruiter_name: "Julian",
      to_complete: true,
      created_at: "2025-01-19T09:15:00Z",
      entries: [
        {
          field_name: "Screening",
          field_type: "textarea",
          value: null,
        },
        {
          field_name: "Remuneración actual",
          field_type: "number",
          value: null,
        },
        {
          field_name: "Remuneración Pretendida",
          field_type: "number",
          value: null,
        },
      ],
    },
  ],
};

// Custom Tour Implementation as fallback
const createCustomTour = () => {
  console.log("🎯 Creating custom tour implementation...");

  const steps = [
    {
      element: '[data-driver-id="perfil"]',
      title: "Perfil del Candidato",
      description:
        "Aquí encontrarás los datos generales del candidato como nombre, correo, ubicación y experiencia.",
    },
    {
      element: '[data-driver-id="formularios"]',
      title: "Formularios",
      description:
        "Completá o revisá los formularios vinculados al proceso de selección.",
    },
    {
      element: '[data-driver-id="analisis"]',
      title: "Análisis",
      description:
        "Visualizá el análisis automático realizado por el sistema sobre este perfil.",
    },
    {
      element: '[data-driver-id="heimdall"]',
      title: "Heimdall",
      description:
        "Revisá la evaluación avanzada generada por Heimdall basada en la información del candidato.",
    },
    {
      element: '[data-driver-id="archivos"]',
      title: "Archivos",
      description:
        "Accedé a los archivos adjuntos como CVs o documentos relevantes del candidato.",
    },
  ];

  let currentStep = 0;

  const createOverlay = () => {
    const overlay = document.createElement("div");
    overlay.id = "custom-tour-overlay";
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.75);
      z-index: 9998;
      pointer-events: none;
      animation: fadeIn 0.3s ease-out;
    `;
    document.body.appendChild(overlay);
    return overlay;
  };

  const createPopover = (step, element) => {
    const popover = document.createElement("div");
    popover.id = "custom-tour-popover";
    popover.style.cssText = `
      position: fixed;
      background: white;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
      z-index: 9999;
      max-width: 300px;
      font-family: system-ui, -apple-system, sans-serif;
      animation: slideInUp 0.4s ease-out;
    `;

    const rect = element.getBoundingClientRect();
    popover.style.top = `${rect.bottom + 10}px`;
    popover.style.left = `${Math.max(10, rect.left)}px`;

    popover.innerHTML = `
      <div style="margin-bottom: 15px;">
        <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: #1f2937;">${
          step.title
        }</h3>
        <p style="margin: 0; font-size: 14px; color: #6b7280; line-height: 1.5;">${
          step.description
        }</p>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 12px; color: #9ca3af;">${currentStep + 1} de ${
      steps.length
    }</span>
        <div style="display: flex; gap: 8px;">
          ${
            currentStep > 0
              ? '<button id="tour-prev" style="padding: 6px 12px; background: #f3f4f6; border: none; border-radius: 4px; cursor: pointer; font-size: 12px; transition: all 0.2s;">Anterior</button>'
              : ""
          }
          ${
            currentStep < steps.length - 1
              ? '<button id="tour-next" style="padding: 6px 12px; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px; transition: all 0.2s;">Siguiente</button>'
              : '<button id="tour-done" style="padding: 6px 12px; background: #10b981; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px; transition: all 0.2s;">Listo</button>'
          }
          <button id="tour-close" style="padding: 6px 12px; background: #ef4444; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px; transition: all 0.2s;">Cerrar</button>
        </div>
      </div>
    `;

    // Add CSS animations
    const style = document.createElement("style");
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes slideInUp {
        from { 
          opacity: 0; 
          transform: translateY(20px); 
        }
        to { 
          opacity: 1; 
          transform: translateY(0); 
        }
      }
    `;
    document.head.appendChild(style);

    document.body.appendChild(popover);
    return popover;
  };

  const highlightElement = (element) => {
    element.style.position = "relative";
    element.style.zIndex = "9999";
    element.style.boxShadow = "0 0 0 4px rgba(59, 130, 246, 0.5)";
    element.style.borderRadius = "4px";
    element.style.transition = "all 0.3s ease-out";
  };

  const removeHighlight = (element) => {
    element.style.position = "";
    element.style.zIndex = "";
    element.style.boxShadow = "";
    element.style.borderRadius = "";
    element.style.transition = "";
  };

  const showStep = (stepIndex) => {
    // Clean up previous step
    const existingOverlay = document.getElementById("custom-tour-overlay");
    const existingPopover = document.getElementById("custom-tour-popover");
    if (existingOverlay) existingOverlay.remove();
    if (existingPopover) existingPopover.remove();

    // Remove previous highlights
    document
      .querySelectorAll("[data-driver-id]")
      .forEach((el) => removeHighlight(el));

    if (stepIndex >= steps.length) {
      console.log("🎉 Custom tour completed!");
      return;
    }

    const step = steps[stepIndex];
    const element = document.querySelector(step.element);

    if (!element) {
      console.log(
        `❌ Element not found for step ${stepIndex}: ${step.element}`
      );
      return;
    }

    currentStep = stepIndex;

    // Create overlay and popover
    const overlay = createOverlay();
    const popover = createPopover(step, element);

    // Highlight element
    highlightElement(element);

    // Add event listeners
    const nextBtn = document.getElementById("tour-next");
    const prevBtn = document.getElementById("tour-prev");
    const doneBtn = document.getElementById("tour-done");
    const closeBtn = document.getElementById("tour-close");

    if (nextBtn) nextBtn.onclick = () => showStep(stepIndex + 1);
    if (prevBtn) prevBtn.onclick = () => showStep(stepIndex - 1);
    if (doneBtn) doneBtn.onclick = () => showStep(steps.length);
    if (closeBtn)
      closeBtn.onclick = () => {
        overlay.remove();
        popover.remove();
        document
          .querySelectorAll("[data-driver-id]")
          .forEach((el) => removeHighlight(el));
      };
  };

  // Start the tour
  showStep(0);
};

export default function CandidateProfile() {
  const [candidate] = useState<Candidate>(mockData);
  const [activeSection, setActiveSection] = useState("perfil");

  // Toolbar handlers
  const handleVincular = () => {
    console.log("🔗 Vincular clicked");
    // Add your vincular logic here
  };

  const handleChat = () => {
    console.log("💬 Chat clicked");
    // Add your chat logic here
  };

  const handleEditar = () => {
    console.log("✏️ Editar clicked");
    // Add your edit logic here
  };

  const handleComparar = () => {
    console.log("⚖️ Comparar clicked");
    // Add your compare logic here
  };

  const handleActualizar = async () => {
    console.log("🔄 Actualizar clicked");
    // Add your refresh logic here
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
  };

  const handleGenerar = () => {
    console.log("⚙️ Generar clicked");
    // Add your generate logic here
  };

  const handleClose = () => {
    console.log("❌ Close clicked");
    // Add your close logic here
  };

  useEffect(() => {
    console.log("🔍 STEP 1: Checking URL parameters");
    const urlParams = new URLSearchParams(window.location.search);
    const driverParam = urlParams.get("Driver");
    console.log("🔍 URL search params:", window.location.search);
    console.log("🔍 Driver parameter value:", driverParam);

    if (driverParam !== "true") {
      console.log("❌ Driver parameter is not 'true', skipping tour");
      return;
    }

    console.log("✅ STEP 2: Driver parameter is valid, proceeding...");

    const initializeTour = async () => {
      // Method 1: Try dynamic import
      console.log("🔍 STEP 3A: Trying dynamic import...");
      try {
        const driverModule = await import("driver.js");
        console.log("✅ Driver.js loaded via dynamic import");

        setTimeout(() => {
          const Driver = driverModule.default;
          console.log("🔍 Driver constructor:", Driver);

          const driver = new Driver({
            showProgress: true,
            nextBtnText: "Siguiente",
            prevBtnText: "Anterior",
            doneBtnText: "Listo",
            overlayClickNext: false,
            allowClose: true,
            opacity: 0.75,
            padding: 10,
            animate: true,
          });

          driver.defineSteps([
            {
              element: '[data-driver-id="perfil"]',
              popover: {
                title: "Perfil del Candidato",
                description:
                  "Aquí encontrarás los datos generales del candidato como nombre, correo, ubicación y experiencia.",
                position: "bottom",
              },
            },
            {
              element: '[data-driver-id="formularios"]',
              popover: {
                title: "Formularios",
                description:
                  "Completá o revisá los formularios vinculados al proceso de selección.",
                position: "bottom",
              },
            },
            {
              element: '[data-driver-id="analisis"]',
              popover: {
                title: "Análisis",
                description:
                  "Visualizá el análisis automático realizado por el sistema sobre este perfil.",
                position: "bottom",
              },
            },
            {
              element: '[data-driver-id="heimdall"]',
              popover: {
                title: "Heimdall",
                description:
                  "Revisá la evaluación avanzada generada por Heimdall basada en la información del candidato.",
                position: "bottom",
              },
            },
            {
              element: '[data-driver-id="archivos"]',
              popover: {
                title: "Archivos",
                description:
                  "Accedé a los archivos adjuntos como CVs o documentos relevantes del candidato.",
                position: "bottom",
              },
            },
          ]);

          console.log("🎉 Starting Driver.js tour...");
          driver.start();
        }, 500);
      } catch (error) {
        console.log("❌ STEP 3A Failed: Dynamic import failed:", error);

        // Method 2: Try different CDN
        console.log("🔍 STEP 3B: Trying alternative CDN...");
        try {
          const script = document.createElement("script");
          script.src = "https://unpkg.com/driver.js@1.3.1/dist/driver.min.js";

          script.onload = () => {
            console.log("✅ Driver.js loaded from unpkg CDN");
            setTimeout(() => {
              if (typeof window.Driver !== "undefined") {
                const driver = new window.Driver({
                  showProgress: true,
                  nextBtnText: "Siguiente",
                  prevBtnText: "Anterior",
                  doneBtnText: "Listo",
                  overlayClickNext: false,
                });

                driver.defineSteps([
                  {
                    element: '[data-driver-id="perfil"]',
                    popover: {
                      title: "Perfil del Candidato",
                      description: "Datos generales del candidato.",
                      position: "bottom",
                    },
                  },
                  {
                    element: '[data-driver-id="formularios"]',
                    popover: {
                      title: "Formularios",
                      description: "Formularios de evaluación.",
                      position: "bottom",
                    },
                  },
                  {
                    element: '[data-driver-id="analisis"]',
                    popover: {
                      title: "Análisis",
                      description: "Análisis automático del sistema.",
                      position: "bottom",
                    },
                  },
                  {
                    element: '[data-driver-id="heimdall"]',
                    popover: {
                      title: "Heimdall",
                      description: "Evaluación avanzada de Heimdall.",
                      position: "bottom",
                    },
                  },
                  {
                    element: '[data-driver-id="archivos"]',
                    popover: {
                      title: "Archivos",
                      description: "Archivos del candidato.",
                      position: "bottom",
                    },
                  },
                ]);

                driver.start();
                console.log("🎉 Driver.js tour started from CDN!");
              } else {
                throw new Error("Driver not available globally");
              }
            }, 500);
          };

          script.onerror = () => {
            console.log("❌ STEP 3B Failed: CDN also failed");
            console.log("🔍 STEP 3C: Using custom tour implementation...");
            setTimeout(createCustomTour, 500);
          };

          document.head.appendChild(script);
        } catch (cdnError) {
          console.log("❌ STEP 3B Failed: CDN error:", cdnError);
          console.log("🔍 STEP 3C: Using custom tour implementation...");
          setTimeout(createCustomTour, 500);
        }
      }
    };

    initializeTour();
  }, []);

  const renderSection = () => {
    const sectionProps = {
      className: "opacity-100 transition-opacity duration-300",
    };

    switch (activeSection) {
      case "perfil":
        return (
          <div {...sectionProps}>
            <ProfileSection candidate={candidate} />
          </div>
        );
      case "formularios":
        return (
          <div {...sectionProps}>
            <FormsSection candidate={candidate} />
          </div>
        );
      case "analisis":
        return (
          <div {...sectionProps}>
            <CommentsSection />
          </div>
        );
      case "heimdall":
        return (
          <div {...sectionProps}>
            <HeimdallSection candidate={candidate} />
          </div>
        );
      case "archivos":
        return (
          <div {...sectionProps}>
            <FilesSection candidate={candidate} />
          </div>
        );
      case "reuniones":
        return (
          <div {...sectionProps}>
            <MeetingsSection />
          </div>
        );
      default:
        return (
          <div {...sectionProps}>
            <ProfileSection candidate={candidate} />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50/50">
      <div className="mx-auto">
        {/* Toolbar */}
        <CandidateToolbar
          onVincular={handleVincular}
          onChat={handleChat}
          onEditar={handleEditar}
          onComparar={handleComparar}
          onActualizar={handleActualizar}
          onGenerar={handleGenerar}
          onClose={handleClose}
        />

        {/* Main Content */}
        <div className="p-6 space-y-8">
          <CandidateHeader candidate={candidate} />
          <CandidateNavigation
            activeSection={activeSection}
            onSectionChange={setActiveSection}
            candidate={candidate}
          />
          <div className="p-6">{renderSection()}</div>
        </div>
      </div>
    </div>
  );
}
