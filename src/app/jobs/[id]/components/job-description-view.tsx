"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Badge } from "@/app/components/ui/badge"
import { Download, FileText, Eye, Edit, ImageIcon, Building2, MapPin } from "lucide-react"
import type { JobResponse } from "../types/ats"

interface JobDescriptionViewProps {
  job: JobResponse
}

export function JobDescriptionView({ job }: JobDescriptionViewProps) {
  const [activeSection, setActiveSection] = useState("resumen")

  const menuItems = [
    { id: "resumen", label: "Resumen", icon: FileText },
    { id: "aviso", label: "Aviso publicitario", icon: Eye },
    { id: "descripcion-privada", label: "Descripción privada", icon: Edit },
    { id: "imagenes", label: "Imagenes BETA", icon: ImageIcon },
  ]

  const renderResumenContent = () => (
    <div className="space-y-6">
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Análisis Detallado */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Análisis Detallado del Puesto
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Perfil del Candidato Ideal</h4>
                <p className="text-sm text-gray-700">
                  Profesional con sólida experiencia en cloud computing y FinOps, capaz de liderar iniciativas de
                  optimización de costos y implementar mejores prácticas en entornos multi-cloud.
                </p>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Competencias Clave</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-900">Gestión de Costos Cloud</span>
                    <Badge variant="secondary" className="text-xs">
                      Crítico
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-900">Automatización Python</span>
                    <Badge variant="secondary" className="text-xs">
                      Alto
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-purple-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-900">Infrastructure as Code</span>
                    <Badge variant="secondary" className="text-xs">
                      Alto
                    </Badge>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Desafíos del Rol</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    Optimizar costos en múltiples plataformas cloud
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    Implementar dashboards de monitoreo en tiempo real
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    Colaborar con equipos técnicos internacionales
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Oportunidades de Crecimiento</h4>
                <p className="text-sm text-gray-700">
                  Posibilidad de liderar la transformación FinOps de la organización, obtener certificaciones cloud
                  avanzadas y trabajar con tecnologías de vanguardia en un entorno 100% remoto.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Column - Resumen Técnico */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Resumen Técnico
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Stack Tecnológico</h4>
                <div className="flex flex-wrap gap-2">
                  {job.perks?.map((tech, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Plataformas Cloud</h4>
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex items-center justify-between p-2 bg-orange-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-900">AWS</span>
                    <Badge className="bg-orange-100 text-orange-800 text-xs">Avanzado</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-900">Google Cloud</span>
                    <Badge className="bg-blue-100 text-blue-800 text-xs">Intermedio</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-900">Azure</span>
                    <Badge className="bg-blue-100 text-blue-800 text-xs">Intermedio</Badge>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Herramientas FinOps</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                    CloudHealth / CloudCheckr
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                    AWS Cost Explorer / GCP Cost Management
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                    Terraform / CloudFormation
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Métricas Clave</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-gray-900">15-25%</div>
                    <div className="text-xs text-gray-600">Reducción de costos esperada</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-gray-900">24/7</div>
                    <div className="text-xs text-gray-600">Monitoreo continuo</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Certificaciones Deseables</h4>
                <div className="space-y-1 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      AWS
                    </Badge>
                    <span>Solutions Architect / Cost Optimization</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      FinOps
                    </Badge>
                    <span>FinOps Certified Practitioner</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Download Buttons */}
      <div className="flex items-center justify-center gap-4 pt-6 border-t border-gray-200">
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Descargar Análisis Completo (PDF)
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Descargar Resumen Técnico (PDF)
        </Button>
        <Button className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Descargar Todo (PDF)
        </Button>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeSection) {
      case "resumen":
        return renderResumenContent()
      case "aviso":
        return (
          <Card>
            <CardContent className="p-6">
              <div className="max-w-4xl mx-auto space-y-6">
                {/* Job Title */}
                <div className="text-center border-b border-gray-200 pb-6">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                  <div className="flex items-center justify-center gap-4 text-gray-600">
                    <span className="flex items-center gap-1">
                      <Building2 className="h-4 w-4" />
                      {job.company.name}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {job.location}
                    </span>
                    <Badge className="bg-green-100 text-green-800">{job.modality}</Badge>
                  </div>
                </div>

                {/* Job Summary */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900">Job Summary:</h2>
                  <p className="text-gray-700 leading-relaxed">
                    A {job.title} at our company is responsible for designing, developing, and maintaining the core
                    components of our software systems. The ideal candidate will have a deep understanding of cloud
                    computing and FinOps practices, with strong software design skills and a deep understanding of cost
                    optimization fundamentals and automation patterns. You will be responsible for developing
                    high-performance, scalable cloud solutions and will have excellent technical problem-solving and
                    analytical skills.
                  </p>
                </div>

                {/* Requirements */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900">Requirements:</h2>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      Minimum of 5+ years of experience in cloud computing (AWS, GCP, Azure)
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      Deep understanding of FinOps practices and cost optimization strategies
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      Strong automation skills with Python for cloud cost management
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      Experience with Infrastructure as Code (Terraform, CloudFormation)
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      Experience with cloud monitoring and alerting systems
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      Experience with cost management tools (CloudHealth, CloudCheckr)
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      Experience with multi-cloud environments and cost optimization
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      Strong analytical and problem-solving skills
                    </li>
                  </ul>
                </div>

                {/* Roles and Responsibilities */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900">Roles and Responsibilities:</h2>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      Deliver on near-term FinOps strategies and support the long-term cloud optimization roadmap
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      Design and implement robust, scalable, and cost-efficient cloud infrastructure solutions
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      Develop and maintain automated cost monitoring and reporting dashboards
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      Implement cloud cost optimization strategies across multiple platforms (AWS, GCP, Azure)
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      Work with engineering teams to optimize resource utilization and reduce cloud spend
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      Create and manage automated alerting systems for cost anomalies and budget overruns
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      Develop Python scripts and tools for cloud cost analysis and optimization
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      Collaborate with cross-functional teams to ensure alignment with project goals and cost targets
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      Participate in architecture reviews and provide cost optimization recommendations
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      Troubleshoot and resolve cloud infrastructure issues to ensure optimal performance and cost
                      efficiency
                    </li>
                  </ul>
                </div>

                {/* What We Offer */}
                <div className="space-y-4 bg-blue-50 p-6 rounded-lg">
                  <h2 className="text-xl font-semibold text-gray-900">What We Offer:</h2>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      100% remote work environment
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      International and diverse team
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      Cloud certification opportunities
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      Continuous learning environment
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      Competitive salary and benefits package
                    </li>
                  </ul>
                </div>

                {/* Apply Section */}
                <div className="text-center pt-6 border-t border-gray-200">
                  <Button size="lg" className="px-8">
                    Apply Now
                  </Button>
                  <p className="text-sm text-gray-600 mt-2">
                    Join our team and help shape the future of cloud cost optimization!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      case "descripcion-privada":
        return (
          <Card>
            <CardContent className="p-6">
              <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div className="text-center border-b border-gray-200 pb-6">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Descripción del Trabajo</h1>
                  <div className="flex items-center justify-center gap-4 text-gray-600">
                    <span className="flex items-center gap-1">
                      <Building2 className="h-4 w-4" />
                      {job.company.name}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {job.location}
                    </span>
                    <Badge className="bg-blue-100 text-blue-800">{job.modality}</Badge>
                  </div>
                </div>

                {/* Job Summary */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900">Job Summary:</h2>
                  <p className="text-gray-700 leading-relaxed">
                    A Backend Engineer at our company is responsible for designing, developing, and maintaining the core
                    components of our software systems. The ideal candidate will have a deep understanding of Java
                    language constructs and strong software design skills, with a deep understanding of object-oriented
                    programming fundamentals and design patterns. You will be responsible for developing
                    high-performance, threaded applications and will have excellent technical problem-solving and
                    debugging skills.
                  </p>
                </div>

                {/* Requirements */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900">Requirements:</h2>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      Minimum of 5 years of experience as a Backend Engineer
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      Deep understanding of Java language constructs
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      Strong software design skills with a deep understanding of object-oriented programming
                      fundamentals and design patterns
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      Experience with high-performance, threaded applications
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      Experience with REST and SOAP based web services
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      Experience with SSO, SAML, and BYOK
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      Experience with KMS in relation to BYOK
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      Experience with AWS Cognito and AWS Lambda
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      Experience with APIs endpoint
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      Experience with RabbitMQ
                    </li>
                  </ul>
                </div>

                {/* Roles and Responsibilities */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900">Roles and Responsibilities:</h2>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      Deliver on near-term technology strategies and support the long-term technological roadmap
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      Design and implement robust, scalable, and efficient backend systems using Java
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      Develop and maintain REST and SOAP based web services
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      Implement Single Sign-On (SSO) and Security Assertion Markup Language (SAML) for secure user
                      authentication
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      Work with Bring Your Own Key (BYOK) and Key Management Service (KMS) to ensure data security
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      Utilize AWS Cognito for user management and authentication
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      Create and manage API endpoints to facilitate seamless data exchange
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      Integrate with RabbitMQ for message queuing and event-driven architectures
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      Utilize AWS Lambda for serverless computing to handle event-driven workloads
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      Collaborate with cross-functional teams to ensure alignment with project goals and deliverables
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      Participate in code reviews and provide constructive feedback to improve code quality
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      Troubleshoot and resolve technical issues to ensure smooth operation of the backend systems
                    </li>
                  </ul>
                </div>

                {/* Salary Information */}
                <div className="space-y-4 bg-gray-50 p-6 rounded-lg">
                  <h2 className="text-xl font-semibold text-gray-900">Información Salarial</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-900">Moneda:</span>
                        <span className="text-gray-700">USD</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-900">Salario Mínimo:</span>
                        <span className="text-gray-700">USD 0</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-900">Salario Máximo:</span>
                        <span className="text-gray-700">USD 0</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-900">Salario Esperado:</span>
                        <span className="text-gray-700">USD 0</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-medium text-gray-900">Resumen de Compensación</h3>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-900">Rango Salarial:</span>
                        <span className="text-gray-700">USD 0 - 0</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-900">Modalidad de Trabajo:</span>
                        <Badge className="bg-green-100 text-green-800">Remoto</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Internal Notes Section */}
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <h3 className="font-medium text-yellow-800 mb-2">Notas Internas</h3>
                  <p className="text-sm text-yellow-700">
                    Esta información es confidencial y solo debe ser compartida con el equipo de reclutamiento interno.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      case "imagenes":
        return (
          <Card>
            <CardContent className="p-6">
              <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div className="text-center border-b border-gray-200 pb-6">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Generador de Imágenes</h1>
                  <div className="flex items-center justify-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      BETA
                    </Badge>
                    <p className="text-gray-600">Genera imágenes promocionales para el puesto</p>
                  </div>
                </div>

                {/* Generate Button */}
                <div className="text-center space-y-4">
                  <Button size="lg" className="px-8 py-3">
                    <ImageIcon className="h-5 w-5 mr-2" />
                    Generar Imagen Promocional
                  </Button>
                  <p className="text-sm text-gray-500">
                    Genera una imagen atractiva basada en la descripción del puesto
                  </p>
                </div>

                {/* Image Placeholder */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Vista Previa de la Imagen</h3>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 bg-gray-50">
                    <div className="text-center space-y-4">
                      <div className="w-24 h-24 mx-auto bg-gray-200 rounded-lg flex items-center justify-center">
                        <ImageIcon className="h-12 w-12 text-gray-400" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-lg font-medium text-gray-900">Imagen no generada</h4>
                        <p className="text-gray-600 max-w-md mx-auto">
                          Haz clic en "Generar Imagen Promocional" para crear una imagen personalizada para este puesto
                        </p>
                      </div>
                      <div className="flex justify-center gap-3 pt-4">
                        <Button variant="outline" disabled>
                          <Download className="h-4 w-4 mr-2" />
                          Descargar PNG
                        </Button>
                        <Button variant="outline" disabled>
                          <Download className="h-4 w-4 mr-2" />
                          Descargar JPG
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Opciones de Estilo</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Estilo Visual</label>
                        <select className="w-full p-2 border border-gray-300 rounded-md text-sm">
                          <option>Profesional</option>
                          <option>Moderno</option>
                          <option>Creativo</option>
                          <option>Minimalista</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Colores</label>
                        <select className="w-full p-2 border border-gray-300 rounded-md text-sm">
                          <option>Azul corporativo</option>
                          <option>Verde tecnología</option>
                          <option>Naranja energético</option>
                          <option>Gris elegante</option>
                        </select>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Información a Incluir</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <label className="flex items-center gap-2">
                          <input type="checkbox" defaultChecked className="rounded" />
                          <span className="text-sm text-gray-700">Título del puesto</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" defaultChecked className="rounded" />
                          <span className="text-sm text-gray-700">Nombre de la empresa</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" defaultChecked className="rounded" />
                          <span className="text-sm text-gray-700">Modalidad de trabajo</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm text-gray-700">Tecnologías principales</span>
                        </label>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      default:
        return renderResumenContent()
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
      {/* Navigation Menu */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <nav className="flex items-center space-x-6 overflow-x-auto">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 hover:scale-105 whitespace-nowrap ${
                  isActive
                    ? "text-blue-600 bg-blue-50 border border-blue-200"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
                {item.id === "imagenes" && (
                  <Badge variant="secondary" className="text-xs ml-1">
                    BETA
                  </Badge>
                )}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Content */}
      <div className="animate-in fade-in-0 slide-in-from-bottom-2 duration-300">{renderContent()}</div>
    </div>
  )
}
