import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Upload, Search, Calendar, Filter, Eye, Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { MemberProtectedRoute } from '@/components/ui/member-protected-route';
import { useMember } from '@/integrations';

// TODO: Create reports entity and implement backend integration
interface MedicalReport {
  id: string;
  title: string;
  type: 'blood-test' | 'x-ray' | 'mri' | 'prescription' | 'consultation' | 'other';
  date: string;
  doctor: string;
  hospital: string;
  fileUrl?: string;
  description?: string;
  status: 'pending' | 'completed' | 'reviewed';
}

export default function ReportsPage() {
  const [reports, setReports] = useState<MedicalReport[]>([]);
  const [filteredReports, setFilteredReports] = useState<MedicalReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const { member } = useMember();

  useEffect(() => {
    // TODO: Implement actual API call to fetch user's medical reports
    const fetchReports = async () => {
      try {
        // Simulated API call - replace with actual backend integration
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // TODO: Replace with actual API call
        // const { items } = await BaseCrudService.getAll<MedicalReport>('medical-reports');
        // Filter by current user
        // const userReports = items.filter(report => report.userId === member?._id);
        // setReports(userReports);
        
        setReports([]); // No dummy data as per requirements
      } catch (error) {
        console.error('Error fetching reports:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [member]);

  useEffect(() => {
    let filtered = reports;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(report =>
        report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.hospital.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(report => report.type === typeFilter);
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(report => report.status === statusFilter);
    }

    setFilteredReports(filtered);
  }, [reports, searchTerm, typeFilter, statusFilter]);

  const handleDownload = (report: MedicalReport) => {
    if (report.fileUrl) {
      window.open(report.fileUrl, '_blank');
    }
  };

  const handleUpload = () => {
    // TODO: Implement file upload functionality
    console.log('Upload new report');
  };

  const handleDelete = (reportId: string) => {
    // TODO: Implement delete functionality with confirmation
    console.log('Delete report:', reportId);
  };

  const getTypeColor = (type: string) => {
    const colors = {
      'blood-test': 'bg-red-100 text-red-800',
      'x-ray': 'bg-blue-100 text-blue-800',
      'mri': 'bg-purple-100 text-purple-800',
      'prescription': 'bg-green-100 text-green-800',
      'consultation': 'bg-yellow-100 text-yellow-800',
      'other': 'bg-gray-100 text-gray-800'
    };
    return colors[type as keyof typeof colors] || colors.other;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'completed': 'bg-green-100 text-green-800',
      'reviewed': 'bg-blue-100 text-blue-800'
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  return (
    <MemberProtectedRoute messageToSignIn="Please sign in to access your medical reports">
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-[120rem] mx-auto px-8">
          {/* Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-heading text-5xl font-bold text-foreground mb-4">
              Medical Reports
            </h1>
            <p className="font-paragraph text-lg text-secondary max-w-3xl mx-auto">
              Access and manage your medical reports, test results, and health documents. 
              Keep track of your health history in one secure location.
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div 
            className="bg-white rounded-lg shadow-sm border border-light-grey p-6 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              {/* Search */}
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary w-5 h-5" />
                  <Input
                    placeholder="Search reports, doctors, or hospitals..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Type Filter */}
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="blood-test">Blood Test</SelectItem>
                  <SelectItem value="x-ray">X-Ray</SelectItem>
                  <SelectItem value="mri">MRI</SelectItem>
                  <SelectItem value="prescription">Prescription</SelectItem>
                  <SelectItem value="consultation">Consultation</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>

              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="reviewed">Reviewed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Upload Button */}
            <div className="flex justify-end">
              <Button onClick={handleUpload} className="flex items-center space-x-2">
                <Upload className="w-4 h-4" />
                <span>Upload Report</span>
              </Button>
            </div>
          </motion.div>

          {/* Results Count */}
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="font-paragraph text-secondary">
              {loading ? 'Loading...' : `${filteredReports.length} reports found`}
            </p>
          </motion.div>

          {/* Reports Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <Card key={index} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-4 bg-light-grey rounded mb-2"></div>
                    <div className="h-3 bg-light-grey rounded mb-4"></div>
                    <div className="h-3 bg-light-grey rounded mb-4"></div>
                    <div className="h-10 bg-light-grey rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredReports.length === 0 ? (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <FileText className="w-16 h-16 text-secondary mx-auto mb-4" />
              <h3 className="font-heading text-2xl font-semibold text-foreground mb-2">
                No reports found
              </h3>
              <p className="font-paragraph text-secondary mb-6">
                {reports.length === 0 
                  ? "You don't have any medical reports yet. Upload your first report to get started."
                  : "Try adjusting your search criteria to find more results."
                }
              </p>
              <Button onClick={handleUpload} className="flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Upload Your First Report</span>
              </Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReports.map((report, index) => (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-light-grey">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="font-heading text-lg font-semibold text-foreground">
                          {report.title}
                        </CardTitle>
                        <div className="flex space-x-1">
                          <Badge className={getTypeColor(report.type)}>
                            {report.type.replace('-', ' ')}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      {/* Report Details */}
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-secondary flex-shrink-0" />
                          <span className="font-paragraph text-sm text-secondary">
                            {new Date(report.date).toLocaleDateString()}
                          </span>
                        </div>
                        
                        <div>
                          <p className="font-paragraph text-sm text-foreground font-medium">
                            Dr. {report.doctor}
                          </p>
                          <p className="font-paragraph text-xs text-secondary">
                            {report.hospital}
                          </p>
                        </div>
                        
                        {report.description && (
                          <p className="font-paragraph text-sm text-secondary line-clamp-2">
                            {report.description}
                          </p>
                        )}
                        
                        <Badge className={getStatusColor(report.status)}>
                          {report.status}
                        </Badge>
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="flex items-center space-x-1"
                          >
                            <Eye className="w-3 h-3" />
                            <span>View</span>
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDownload(report)}
                            disabled={!report.fileUrl}
                            className="flex items-center space-x-1"
                          >
                            <Download className="w-3 h-3" />
                            <span>Download</span>
                          </Button>
                        </div>
                        
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDelete(report.id)}
                          className="w-full text-destructive hover:text-destructive hover:bg-destructive/10 flex items-center space-x-1"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Delete</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {/* Upload Instructions */}
          <motion.div 
            className="mt-12 bg-light-grey/30 rounded-lg p-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="font-heading text-2xl font-bold text-foreground mb-4 text-center">
              How to Upload Reports
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary-foreground font-bold">1</span>
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                  Scan or Photo
                </h3>
                <p className="font-paragraph text-sm text-secondary">
                  Take a clear photo or scan of your medical report
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary-foreground font-bold">2</span>
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                  Upload File
                </h3>
                <p className="font-paragraph text-sm text-secondary">
                  Click upload and select your file (PDF, JPG, PNG)
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary-foreground font-bold">3</span>
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                  Add Details
                </h3>
                <p className="font-paragraph text-sm text-secondary">
                  Fill in report details like date, doctor, and type
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </MemberProtectedRoute>
  );
}