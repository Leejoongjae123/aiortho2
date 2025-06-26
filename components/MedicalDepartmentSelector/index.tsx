import React, { useState } from 'react';
import MultiColumnDropdown, { ArrayItem } from '@/components/ui/multi-column-dropdown';
import { ChevronDown } from 'lucide-react';
import OrthoInput from '@/components/OrthoInput';
import { useMedicalDepartments } from './hooks';
import { MedicalDepartment } from '@/models';
const MedicalDepartmentSelector = () => {
  const medicalDepartmentsQuery = useMedicalDepartments();
  const [departmentDropDownIsOpen, setDepartmentDropDownIsOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<MedicalDepartment>();

  const toggleDropdown = () => {
    setDepartmentDropDownIsOpen(!departmentDropDownIsOpen);
  };

  const handleDepartmentSelect = (department: MedicalDepartment) => {
    setSelectedDepartment(department);
    setDepartmentDropDownIsOpen(false);
  };

  if (medicalDepartmentsQuery.isFetching) return null;

  return (
    <div className="relative">
      <div onClick={toggleDropdown} className="cursor-pointer">
        <OrthoInput
          label="진료과"
          value={selectedDepartment?.name}
          placeholder="진료과를 선택해주세요"
          rightIcon={<ChevronDown size={20} color="#97A8C4" />}
          required
        />
      </div>

      <MultiColumnDropdown
        isOpen={departmentDropDownIsOpen}
        onClose={() => setDepartmentDropDownIsOpen(false)}
        onSelect={handleDepartmentSelect}
        className="mt-3"
        items={medicalDepartmentsQuery.data ?? []}
        width="w-full"
      />
    </div>
  );
};

export default MedicalDepartmentSelector;
