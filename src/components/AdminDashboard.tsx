import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { DashboardHeader } from './DashboardHeader';
import { mockApi } from '../utils/mockApi';
import { DashboardOverview } from './admin/DashboardOverview';
import { StudentManagement } from './admin/StudentManagement';
import { UnitManagement } from './admin/UnitManagement';
import { ReportsModule } from './admin/ReportsModule';
import { UnitOverlapMatrix } from './admin/UnitOverlapMatrix';
import { OverlapInsights } from './admin/OverlapInsights';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { BarChart3, BookOpen, Grid3x3, LayoutDashboard, Sparkles, Users } from 'lucide-react';

interface AdminDashboardProps {
  user: any;
  onLogout: () => void;
}

export function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [units, setUnits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  const pendingCount = enrollments.filter((e) => e.status === 'pending').length;

  const conflictCount = enrollments.reduce((total, current) => {
    const sameStudent = enrollments.filter((e) => e.studentEmail === current.studentEmail);
    const overlap = sameStudent.filter(
      (e) => e.id !== current.id && e.dayPreference === current.dayPreference && e.timePreference === current.timePreference
    );
    return total + (overlap.length > 0 ? 1 : 0);
  }, 0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch all enrollments (previously called preferences)
      const preferencesData = await mockApi.getAllPreferences();
      setEnrollments(preferencesData.preferences || []);

      // Fetch students
      const usersData = await mockApi.getUsers('student');
      setStudents(usersData.users || []);

      // Fetch units (previously called courses)
      const coursesData = await mockApi.getCourses();
      setUnits(coursesData.courses || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f6f9fc] via-[#eef4fb] to-[#e8f1fb]">
      <DashboardHeader user={user} onLogout={onLogout} />

      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-[#102a43] mb-2">Admin Portal</h1>
          <p className="text-[#486581]">
            Manage students, units, and generate comprehensive enrollment reports
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          <Card className="border-[#d9e2ec] bg-white/95 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-[#486581] font-medium">Total Students</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <p className="text-3xl font-semibold text-[#102a43]">{students.length}</p>
              <div className="h-10 w-10 rounded-lg bg-[#eef4fb] grid place-items-center">
                <Users className="h-5 w-5 text-[#0f4c81]" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#d9e2ec] bg-white/95 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-[#486581] font-medium">Total Units</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <p className="text-3xl font-semibold text-[#102a43]">{units.length}</p>
              <div className="h-10 w-10 rounded-lg bg-[#eef4fb] grid place-items-center">
                <BookOpen className="h-5 w-5 text-[#0f4c81]" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#d9e2ec] bg-white/95 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-[#486581] font-medium">Pending Approvals</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <p className="text-3xl font-semibold text-[#102a43]">{pendingCount}</p>
              <div className="h-10 w-10 rounded-lg bg-[#fff7e6] grid place-items-center">
                <BarChart3 className="h-5 w-5 text-[#b7791f]" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#d9e2ec] bg-white/95 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-[#486581] font-medium">Potential Conflicts</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <p className="text-3xl font-semibold text-[#102a43]">{conflictCount}</p>
              <div className="h-10 w-10 rounded-lg bg-[#fef2f2] grid place-items-center">
                <Sparkles className="h-5 w-5 text-[#c53030]" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 h-auto gap-2 bg-transparent p-0">
            <TabsTrigger value="dashboard" className="border border-[#d9e2ec] data-[state=active]:bg-[#0f4c81] data-[state=active]:text-white rounded-md">
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="students" className="border border-[#d9e2ec] data-[state=active]:bg-[#0f4c81] data-[state=active]:text-white rounded-md">
              <Users className="h-4 w-4 mr-2" />
              Students
            </TabsTrigger>
            <TabsTrigger value="units" className="border border-[#d9e2ec] data-[state=active]:bg-[#0f4c81] data-[state=active]:text-white rounded-md">
              <BookOpen className="h-4 w-4 mr-2" />
              Units
            </TabsTrigger>
            <TabsTrigger value="reports" className="border border-[#d9e2ec] data-[state=active]:bg-[#0f4c81] data-[state=active]:text-white rounded-md">
              <BarChart3 className="h-4 w-4 mr-2" />
              Reports
            </TabsTrigger>
            <TabsTrigger value="overlap" className="border border-[#d9e2ec] data-[state=active]:bg-[#0f4c81] data-[state=active]:text-white rounded-md">
              <Grid3x3 className="h-4 w-4 mr-2" />
              Overlap Matrix
            </TabsTrigger>
            <TabsTrigger value="insights" className="border border-[#d9e2ec] data-[state=active]:bg-[#0f4c81] data-[state=active]:text-white rounded-md">
              <Sparkles className="h-4 w-4 mr-2" />
              Insights
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard">
            <DashboardOverview 
              students={students}
              units={units}
              enrollments={enrollments}
            />
          </TabsContent>

          {/* Student Management Tab */}
          <TabsContent value="students">
            <StudentManagement
              students={students}
              enrollments={enrollments}
              units={units}
            />
          </TabsContent>

          {/* Unit Management Tab */}
          <TabsContent value="units">
            <UnitManagement
              units={units}
              enrollments={enrollments}
            />
          </TabsContent>

          {/* Reports Module Tab */}
          <TabsContent value="reports">
            <ReportsModule
              students={students}
              units={units}
              enrollments={enrollments}
            />
          </TabsContent>

          {/* Overlap Matrix Tab */}
          <TabsContent value="overlap">
            <UnitOverlapMatrix
              units={units}
              enrollments={enrollments}
              students={students}
            />
          </TabsContent>

          {/* Overlap Insights Tab */}
          <TabsContent value="insights">
            <OverlapInsights
              units={units}
              enrollments={enrollments}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
