import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Filter, PlusCircle } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

const DoctorPrescriptions = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const isDoctor = localStorage.getItem('isDoctor') === 'true';
    
    if (!isLoggedIn || !isDoctor) {
      toast({
        title: "Access denied",
        description: "Please login as a doctor to access this page.",
        variant: "destructive",
      });
      navigate('/doctor/login');
      return;
    }
  }, [navigate, toast]);

  // Example prescriptions data - in a real app, this would come from an API
  const prescriptions = [
    {
      id: 1,
      date: "2025-04-15",
      patient: {
        id: "101",
        name: "John Doe",
        age: 37,
        gender: "Male"
      },
      medications: [
        { name: "Amoxicillin", dosage: "500mg", frequency: "3 times daily", duration: "7 days" }
      ],
      status: "Active",
      notes: "Take with food. Complete the full course."
    },
    {
      id: 2,
      date: "2025-04-10",
      patient: {
        id: "102",
        name: "Jane Smith",
        age: 42,
        gender: "Female"
      },
      medications: [
        { name: "Lisinopril", dosage: "10mg", frequency: "Once daily", duration: "30 days" }
      ],
      status: "Active",
      notes: "Monitor blood pressure weekly."
    },
    {
      id: 3,
      date: "2025-03-28",
      patient: {
        id: "103",
        name: "Robert Wilson",
        age: 65,
        gender: "Male"
      },
      medications: [
        { name: "Atorvastatin", dosage: "20mg", frequency: "Once daily at bedtime", duration: "90 days" },
        { name: "Aspirin", dosage: "81mg", frequency: "Once daily", duration: "90 days" }
      ],
      status: "Active",
      notes: "Schedule a follow-up appointment after 30 days."
    },
    {
      id: 4,
      date: "2025-03-15",
      patient: {
        id: "104",
        name: "Emily Davis",
        age: 29,
        gender: "Female"
      },
      medications: [
        { name: "Fluoxetine", dosage: "20mg", frequency: "Once daily", duration: "30 days" }
      ],
      status: "Expired",
      notes: "Schedule follow-up appointment to assess efficacy."
    },
    {
      id: 5,
      date: "2025-02-22",
      patient: {
        id: "105",
        name: "Michael Johnson",
        age: 51,
        gender: "Male"
      },
      medications: [
        { name: "Metformin", dosage: "500mg", frequency: "Twice daily", duration: "90 days" }
      ],
      status: "Expired",
      notes: "Monitor blood glucose levels regularly."
    }
  ];

  // Filter prescriptions based on search query and status filter
  const filteredPrescriptions = prescriptions.filter(prescription => {
    const matchesSearch = prescription.patient.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        prescription.medications.some(med => med.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (statusFilter === 'all') return matchesSearch;
    return matchesSearch && prescription.status.toLowerCase() === statusFilter.toLowerCase();
  });

  const handlePrescriptionClick = (id) => {
    // Navigate to prescription detail page
    navigate(`/doctor/prescription/${id}`);
  };

  const handleNewPrescription = () => {
    navigate('/doctor/prescription/new');
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col pl-0 ml-0 -ml-[2px] border-l-0 overflow-y-auto">
        <Header />
        
        <main className="p-4 md:p-6 flex-1">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
              <h1 className="text-2xl font-semibold text-gray-900">
                Prescriptions
              </h1>
              
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Search patients or medications..."
                    className="pl-8 w-full md:w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-2">
                  <select 
                    className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="expired">Expired</option>
                  </select>
                  
                  <Button onClick={handleNewPrescription} className="gap-2">
                    <PlusCircle size={16} />
                    New Prescription
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="grid gap-6">
              {filteredPrescriptions.length === 0 ? (
                <div className="text-center py-10 bg-white rounded-lg shadow">
                  <p className="text-gray-500">No prescriptions found.</p>
                </div>
              ) : (
                filteredPrescriptions.map((prescription) => (
                  <Card 
                    key={prescription.id} 
                    className="bg-white hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handlePrescriptionClick(prescription.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            Patient: {prescription.patient.name}
                          </h3>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 mt-1">
                            <p>ID: {prescription.patient.id}</p>
                            <p>{prescription.patient.age} years, {prescription.patient.gender}</p>
                            <p>Date: {prescription.date}</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${prescription.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {prescription.status}
                        </span>
                      </div>
                      
                      <div className="space-y-4">
                        {prescription.medications.map((medication, index) => (
                          <div key={index} className="bg-gray-50 rounded-lg p-4">
                            <h4 className="font-medium text-gray-900">{medication.name}</h4>
                            <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
                              <p>Dosage: {medication.dosage}</p>
                              <p>Frequency: {medication.frequency}</p>
                              <p>Duration: {medication.duration}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {prescription.notes && (
                        <div className="mt-4 border-t pt-4">
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">Notes:</span> {prescription.notes}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DoctorPrescriptions;