import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

const DoctorSettings = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col pl-0 ml-0 -ml-[3px] border-l-0 overflow-y-auto">
        <Header />
        <main className="p-4 md:p-6 flex-1">
          <div className="container max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Doctor Settings</h1>
            
            <div className="space-y-6">
              {/* Professional Profile Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Professional Profile</CardTitle>
                  <CardDescription>Manage your professional information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          defaultValue="Dr. Sarah Johnson"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="specialty">Specialty</Label>
                        <Input
                          id="specialty"
                          defaultValue="Cardiology"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="licenseNumber">License Number</Label>
                        <Input
                          id="licenseNumber"
                          defaultValue="MD12345678"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                        <Input
                          id="yearsOfExperience"
                          type="number"
                          defaultValue="15"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="biography">Professional Biography</Label>
                      <Textarea
                        id="biography"
                        className="min-h-[100px]"
                        defaultValue="Board-certified cardiologist with 15 years of experience specializing in preventive cardiology and cardiac rehabilitation. Graduated from Johns Hopkins School of Medicine and completed residency at Mayo Clinic."
                      />
                    </div>
                    <Button className="mt-4">Save Changes</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>Update your contact details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          defaultValue="dr.johnson@medclinic.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          defaultValue="+1 (555) 987-6543"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="office">Office Address</Label>
                        <Input
                          id="office"
                          defaultValue="456 Medical Plaza, Suite 301"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="hospital">Hospital Affiliation</Label>
                        <Input
                          id="hospital"
                          defaultValue="City General Hospital"
                        />
                      </div>
                    </div>
                    <Button className="mt-4">Update Contact Info</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Availability Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Availability & Scheduling</CardTitle>
                  <CardDescription>Configure your working hours and appointment preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="appointmentDuration">Default Appointment Duration</Label>
                      <select id="appointmentDuration" className="w-full p-2 border rounded-md">
                        <option value="15">15 minutes</option>
                        <option value="30" selected>30 minutes</option>
                        <option value="45">45 minutes</option>
                        <option value="60">60 minutes</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bufferTime">Buffer Time Between Appointments</Label>
                      <select id="bufferTime" className="w-full p-2 border rounded-md">
                        <option value="0">No buffer</option>
                        <option value="5">5 minutes</option>
                        <option value="10" selected>10 minutes</option>
                        <option value="15">15 minutes</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mt-4">
                    <Label>Working Days</Label>
                    <div className="flex flex-wrap gap-2">
                      {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                        <div key={day} className="flex items-center space-x-2">
                          <input 
                            type="checkbox" 
                            id={day} 
                            defaultChecked={day !== "Saturday" && day !== "Sunday"} 
                            className="h-4 w-4"
                          />
                          <Label htmlFor={day}>{day}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <Label htmlFor="allowOnlineBooking">Allow Online Booking</Label>
                    <Switch id="allowOnlineBooking" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="offerVirtualConsults">Offer Virtual Consultations</Label>
                    <Switch id="offerVirtualConsults" defaultChecked />
                  </div>
                  <Button className="mt-2">Save Availability Settings</Button>
                </CardContent>
              </Card>

              {/* Notification Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Choose how you want to receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="newAppointmentEmail">New Appointment Emails</Label>
                    <Switch id="newAppointmentEmail" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="appointmentReminderEmail">Appointment Reminder Emails</Label>
                    <Switch id="appointmentReminderEmail" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="patientMessagesEmail">Patient Message Notifications</Label>
                    <Switch id="patientMessagesEmail" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="pushNotifications">Push Notifications</Label>
                    <Switch id="pushNotifications" defaultChecked />
                  </div>
                </CardContent>
              </Card>

              {/* Security Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Security</CardTitle>
                  <CardDescription>Manage your account security</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="destructive">Change Password</Button>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                    <Switch id="twoFactorAuth" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sessionTimeout">Auto-logout after inactivity (HIPAA compliance)</Label>
                    <Switch id="sessionTimeout" defaultChecked />
                  </div>
                </CardContent>
              </Card>

              {/* Billing Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Billing Information</CardTitle>
                  <CardDescription>Manage your payment methods and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="taxId">Tax ID / SSN</Label>
                      <Input
                        id="taxId"
                        type="password"
                        defaultValue="***-**-1234"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bankAccount">Bank Account</Label>
                      <Input
                        id="bankAccount"
                        defaultValue="****4567"
                        disabled
                      />
                    </div>
                  </div>
                  <Button className="mt-4">Update Payment Information</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DoctorSettings;