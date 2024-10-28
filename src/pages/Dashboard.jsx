import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Pencil,
  Trash2,
  Plus,
  Search,
  AlignJustify,
  User,
  X,
  Eye,
} from "lucide-react";

// Sample data for each section
const specialities = [
  { id: 1, name: "Cardiologist", createdAt: "2024-08-22 09:28:12" },
  { id: 2, name: "Dermatologist", createdAt: "2024-08-31 19:44:33" },
  { id: 3, name: "Neurologist", createdAt: "2024-09-07 17:34:29" },
  { id: 4, name: "Pediatrician", createdAt: "2024-09-07 17:34:47" },
];

const doctors = [
  {
    id: 1,
    name: "Doctor1",
    speciality: "Dermatologist",
    createdAt: "2024-09-07 20:22:05",
  },
  {
    id: 2,
    name: "ravi",
    speciality: "Cardiologist",
    createdAt: "2024-09-09 18:01:13",
  },
  {
    id: 3,
    name: "raju",
    speciality: "specailist1",
    createdAt: "2024-09-15 06:55:15",
  },
  {
    id: 4,
    name: "koushik",
    speciality: "Cardiologist",
    createdAt: "2024-10-05 18:58:00",
  },
];

const patients = [
  { id: 1, name: "Patient", createdAt: "2024-09-07 20:29:36" },
  { id: 2, name: "raj", createdAt: "2024-09-09 17:43:18" },
  { id: 3, name: "raj", createdAt: "2024-10-03 03:49:24" },
];

const appointments = [
  {
    id: 1,
    patientName: "raj",
    doctorName: "Doctor1",
    type: "Hospital Visit",
    date: "2024-10-04",
  },
  {
    id: 2,
    patientName: "raj",
    doctorName: "Doctor1",
    type: "Video Consultation",
    date: "2024-10-06",
  },
  {
    id: 3,
    patientName: "raj",
    doctorName: "koushik",
    type: "Video Consultation",
    date: "2024-10-08",
  },
];

const medicines = [
  {
    id: 1,
    name: "Medicine1",
    category: "Medicines",
    price: 12,
    addedOn: "2024-09-08 05:21:49",
  },
  {
    id: 2,
    name: "Medicine2",
    category: "Medicines",
    price: 123,
    addedOn: "2024-09-09 18:11:12",
  },
];

const books = [
  {
    id: 1,
    name: "Doctor Book 1",
    category: "Books",
    price: 50,
    addedOn: "2024-09-08 05:49:10",
  },
];

const orders = [
  {
    id: 1,
    orderNumber: "#973955",
    status: "Yet to be ready",
    createdAt: "2024-09-08 08:34:32",
  },
  {
    id: 2,
    orderNumber: "#464318",
    status: "PENDING",
    createdAt: "2024-09-08 09:37:05",
  },
  {
    id: 3,
    orderNumber: "#609323",
    status: "Delivered",
    createdAt: "2024-09-15 05:15:58",
  },
];

export default function MedicalDashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState([]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const toggleExpand = (item) => {
    setExpandedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardContent />;
      case "doctors":
        return <DoctorsContent doctors={doctors} />;
      case "doctors-approval":
        return <DoctorsApprovalContent />;
      case "patients":
        return <PatientsContent patients={patients} />;
      case "appointments":
        return <AppointmentsContent appointments={appointments} />;
      case "medicines":
        return <MedicinesContent medicines={medicines} />;
      case "books":
        return <BooksContent books={books} />;
      case "create-product":
        return <CreateProductContent />;
      case "orders":
        return <OrdersContent orders={orders} />;
      default:
        return <SpecialitiesContent specialities={specialities} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-50 w-64 bg-slate-700 text-white transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0`}
      >
        <div className="flex items-center justify-between p-4">
          <div className="text-xl font-bold">Main</div>
          <button onClick={toggleSidebar} className="lg:hidden">
            <X size={24} />
          </button>
        </div>
        <nav>
          <SidebarItem
            icon={<ChevronRight size={20} />}
            label="Dashboard"
            onClick={() => setActivePage("dashboard")}
            active={activePage === "dashboard"}
          />
          <SidebarItem
            icon={
              expandedItems.includes("doctors") ? (
                <ChevronDown size={20} />
              ) : (
                <ChevronRight size={20} />
              )
            }
            label="Doctors"
            onClick={() => toggleExpand("doctors")}
            active={activePage.startsWith("doctors")}
          >
            {expandedItems.includes("doctors") && (
              <>
                <SidebarSubItem
                  label="Departments"
                  onClick={() => setActivePage("departments")}
                />
                <SidebarSubItem
                  label="Doctors"
                  onClick={() => setActivePage("doctors")}
                />
                <SidebarSubItem
                  label="Doctors For Approval"
                  onClick={() => setActivePage("doctors-approval")}
                />
              </>
            )}
          </SidebarItem>
          <SidebarItem
            icon={<ChevronRight size={20} />}
            label="Patients"
            onClick={() => setActivePage("patients")}
            active={activePage === "patients"}
          />
          <SidebarItem
            icon={<ChevronRight size={20} />}
            label="Appointments"
            onClick={() => setActivePage("appointments")}
            active={activePage === "appointments"}
          />
          <SidebarItem
            icon={
              expandedItems.includes("medicines") ? (
                <ChevronDown size={20} />
              ) : (
                <ChevronRight size={20} />
              )
            }
            label="Medicines and Books"
            onClick={() => toggleExpand("medicines")}
            active={["medicines", "books", "create-product"].includes(
              activePage
            )}
          >
            {expandedItems.includes("medicines") && (
              <>
                <SidebarSubItem
                  label="Create Product or Book"
                  onClick={() => setActivePage("create-product")}
                />
                <SidebarSubItem
                  label="Books"
                  onClick={() => setActivePage("books")}
                />
                <SidebarSubItem
                  label="Medicines"
                  onClick={() => setActivePage("medicines")}
                />
              </>
            )}
          </SidebarItem>
          <SidebarItem
            icon={<ChevronRight size={20} />}
            label="Orders"
            onClick={() => setActivePage("orders")}
            active={activePage === "orders"}
          />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              className="text-gray-500 focus:outline-none lg:hidden"
              onClick={toggleSidebar}
            >
              <AlignJustify size={24} />
            </button>
            <div className="relative">
              <button className="flex items-center space-x-2 focus:outline-none">
                <User size={24} className="text-gray-700" />
                <span className="text-gray-700">Admin</span>
                <ChevronDown size={20} className="text-gray-700" />
              </button>
            </div>
          </div>
        </header>

        <div className="p-6">{renderContent()}</div>
      </main>
    </div>
  );
}

function SidebarItem({ icon, label, active = false, children, onClick }) {
  return (
    <div className={`${active ? "bg-blue-800" : ""}`}>
      <div
        className={`flex items-center px-4 py-2 text-gray-300 hover:bg-blue-800 cursor-pointer`}
        onClick={onClick}
      >
        {icon}
        <span className="ml-2">{label}</span>
      </div>
      {children && <div className="ml-4">{children}</div>}
    </div>
  );
}

function SidebarSubItem({ label, onClick }) {
  return (
    <div
      className="px-4 py-2 text-gray-400 hover:bg-blue-800 cursor-pointer"
      onClick={onClick}
    >
      {label}
    </div>
  );
}

function DashboardContent() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Welcome Admin!</h2>
      <p className="text-gray-600">
        This is your medical management system dashboard. Use the sidebar to
        navigate through different sections.
      </p>
    </div>
  );
}

function SpecialitiesContent({ specialities }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Specialities</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          <Plus size={20} className="inline mr-2" />
          Create Speciality
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                S.No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Speciality
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {specialities.map((speciality, index) => (
              <tr key={speciality.id}>
                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {speciality.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {speciality.createdAt}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                    <Pencil size={18} />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DoctorsContent({ doctors }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Doctors</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          <Plus size={20} className="inline mr-2" />
          Create Doctor
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                S.No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Doctor Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Speciality
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {doctors.map((doctor, index) => (
              <tr key={doctor.id}>
                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">{doctor.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {doctor.speciality}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {doctor.createdAt}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right  text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DoctorsApprovalContent() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Doctors For Approval</h2>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                S.No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Doctor Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Speciality
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td
                className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                colSpan={6}
              >
                No data available in table
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PatientsContent({ patients }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Patients</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          <Plus size={20} className="inline mr-2" />
          Create Patient
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                S.No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Patient Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {patients.map((patient, index) => (
              <tr key={patient.id}>
                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">{patient.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {patient.createdAt}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AppointmentsContent({ appointments }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Appointments</h2>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                S.No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Patient Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Doctor Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Appointment Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Appointment Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {appointments.map((appointment, index) => (
              <tr key={appointment.id}>
                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {appointment.patientName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {appointment.doctorName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {appointment.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {appointment.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MedicinesContent({ medicines }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Medicines</h2>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                S.No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Regular Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Added On
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {medicines.map((medicine, index) => (
              <tr key={medicine.id}>
                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">{medicine.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {medicine.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ${medicine.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {medicine.addedOn}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                    <Pencil size={18} />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BooksContent({ books }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Books</h2>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                S.No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Regular Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Added On
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {books.map((book, index) => (
              <tr key={book.id}>
                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">{book.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{book.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">${book.price}</td>
                <td className="px-6 py-4 whitespace-nowrap">{book.addedOn}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                    <Pencil size={18} />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CreateProductContent() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Create Product or Book</h2>
      <div className="bg-white shadow-md rounded-lg p-6">
        <form>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="productName"
                className="block text-sm font-medium text-gray-700"
              >
                Product Name
              </label>
              <input
                type="text"
                id="productName"
                name="productName"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="productCode"
                className="block text-sm font-medium text-gray-700"
              >
                Product Code
              </label>
              <input
                type="text"
                id="productCode"
                name="productCode"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="productImage"
                className="block text-sm font-medium text-gray-700"
              >
                Product Image
              </label>
              <input
                type="file"
                id="productImage"
                name="productImage"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="productSKU"
                className="block text-sm font-medium text-gray-700"
              >
                Product SKU
              </label>
              <input
                type="text"
                id="productSKU"
                name="productSKU"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="col-span-2">
              <label
                htmlFor="productDescription"
                className="block text-sm font-medium text-gray-700"
              >
                Product Description
              </label>
              <textarea
                id="productDescription"
                name="productDescription"
                rows={3}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Select Category
              </label>
              <select
                id="category"
                name="category"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option>Books</option>
                <option>Medicines</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="regularPrice"
                className="block text-sm font-medium text-gray-700"
              >
                Regular Price
              </label>
              <input
                type="number"
                id="regularPrice"
                name="regularPrice"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function OrdersContent({ orders }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Orders</h2>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                S.No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order, index) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {order.orderNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-800"
                        : order.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {order.createdAt}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
