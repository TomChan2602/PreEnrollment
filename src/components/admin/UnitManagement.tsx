import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Download, TrendingUp, TrendingDown } from 'lucide-react';
import { toast } from 'sonner';

interface UnitManagementProps {
  units: any[];
  enrollments: any[];
}

export function UnitManagement({ units, enrollments }: UnitManagementProps) {
  const getUnitEnrollmentCount = (unitId: string) => {
    return enrollments.filter(e => e.courseId === unitId).length;
  };
  
  const unitsWithStats = units.map(unit => ({
    ...unit,
    enrollmentCount: getUnitEnrollmentCount(unit.id),
  })).sort((a, b) => b.enrollmentCount - a.enrollmentCount);
  
  const avgEnrollment = unitsWithStats.reduce((sum, u) => sum + u.enrollmentCount, 0) / unitsWithStats.length;
  
  const highDemand = unitsWithStats.filter(u => u.enrollmentCount > avgEnrollment);
  const lowDemand = unitsWithStats.filter(u => u.enrollmentCount <= avgEnrollment && u.enrollmentCount > 0);
  const noDemand = unitsWithStats.filter(u => u.enrollmentCount === 0);
  
  const exportUnitReport = () => {
    let csvContent = 'CIHE PRE-ENROLMENT SYSTEM - UNIT MANAGEMENT REPORT\\n';
    csvContent += `Generated: ${new Date().toLocaleString()}\\n\\n`;
    csvContent += 'Unit Name,Unit Code,Students Enrolled,Semester,Demand Level\\n';
    
    unitsWithStats.forEach(unit => {
      const demandLevel = unit.enrollmentCount > avgEnrollment ? 'High' : 
                         unit.enrollmentCount > 0 ? 'Medium' : 'Low';
      csvContent += `"${unit.name}",${unit.unitCode},${unit.enrollmentCount},${unit.semester || 'N/A'},${demandLevel}\\n`;
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `unit-management-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    toast.success('Unit report exported successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-[#d9e2ec] bg-white/95 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-[#2a9d8f]" />
              High Demand Units
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#2a9d8f]">{highDemand.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Above average enrollment</p>
          </CardContent>
        </Card>

        <Card className="border-[#d9e2ec] bg-white/95 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-[#b7791f]" />
              Medium Demand Units
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#b7791f]">{lowDemand.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Below average enrollment</p>
          </CardContent>
        </Card>

        <Card className="border-[#d9e2ec] bg-white/95 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-[#c53030]" />
              Low Demand Units
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#c53030]">{noDemand.length}</div>
            <p className="text-xs text-muted-foreground mt-1">No enrollments yet</p>
          </CardContent>
        </Card>
      </div>

      {/* Unit List */}
      <Card className="border-[#d9e2ec] bg-white/95 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Units</CardTitle>
              <CardDescription>Complete list of units with enrollment statistics</CardDescription>
            </div>
            <Button onClick={exportUnitReport} variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-[#d9e2ec] overflow-hidden">
          <Table>
            <TableHeader className="bg-[#f0f4f8]">
              <TableRow>
                <TableHead>Unit Code</TableHead>
                <TableHead>Unit Name</TableHead>
                <TableHead>Semester</TableHead>
                <TableHead>Students Enrolled</TableHead>
                <TableHead>Demand Level</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {unitsWithStats.map((unit) => {
                const demandLevel = unit.enrollmentCount > avgEnrollment ? 'high' : 
                                   unit.enrollmentCount > 0 ? 'medium' : 'low';
                const badgeColor = demandLevel === 'high' ? 'bg-green-600' :
                                  demandLevel === 'medium' ? 'bg-orange-600' : 'bg-red-600';
                
                return (
                  <TableRow key={unit.id} className="hover:bg-[#f8fbff]">
                    <TableCell>
                      <Badge variant="outline" className="font-mono">{unit.unitCode}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">{unit.name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{unit.semester || 'N/A'}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-[#0f4c81]">{unit.enrollmentCount}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={badgeColor}>
                        {demandLevel.charAt(0).toUpperCase() + demandLevel.slice(1)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}