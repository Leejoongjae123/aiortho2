import React, { useState } from 'react';
import MultiColumnDropdown, { ArrayItem } from '@/components/ui/multi-column-dropdown';
import { ChevronDown } from 'lucide-react';
import OrthoInput from '@/components/OrthoInput';
import { MedicalDepartment } from '@/models';
import { UseFormRegisterReturn } from 'react-hook-form';

interface MedicalDepartmentSelectorProps {
  label: string;
  placeholder: string;
  registration: UseFormRegisterReturn;
  error?: string;
  items: ArrayItem[];
  required?: boolean;
  isDirty?: boolean;
  selectedDepartmentName?: string;
  onChange?: (department?: MedicalDepartment) => void;
}

export default function MedicalDepartmentSelector({
  label,
  placeholder,
  items,
  registration,
  error,
  required = false,
  isDirty = false,
  selectedDepartmentName,
  onChange,
}: MedicalDepartmentSelectorProps) {
  const [departmentDropDownIsOpen, setDepartmentDropDownIsOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<MedicalDepartment>();

  const toggleDropdown = () => {
    setDepartmentDropDownIsOpen(!departmentDropDownIsOpen);
  };

  const handleSelectDepartment = (department?: MedicalDepartment) => {
    setSelectedDepartment(department);

    if (onChange) {
      onChange(department);
    }
  };

  return (
    <div className="relative">
      <div onClick={toggleDropdown} className="cursor-pointer">
        <OrthoInput
          label={label}
          registration={registration}
          placeholder={placeholder}
          value={selectedDepartmentName ?? (selectedDepartment?.name || '')}
          rightIcon={<ChevronDown size={20} color="#97A8C4" />}
          error={error}
          required={required}
          isDirty={isDirty}
        />
      </div>

      <MultiColumnDropdown
        isOpen={departmentDropDownIsOpen}
        onClose={() => setDepartmentDropDownIsOpen(false)}
        onSelect={handleSelectDepartment}
        className="mt-3"
        items={items}
        width="w-full"
      />
    </div>
  );
}
