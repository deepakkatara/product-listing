import React from 'react';
import { CheckPicker } from 'rsuite';
import "./multiSelectdropDown.scss";

interface AppMultiSelectDropDownProps {
  data: any;
  placeholder: string;
  onChangeHandler: (value: any, event: any) => void;
  isOpen: boolean;
  onCloseHandler: () => void;
  onCleanHandler?: (event: any) => void;
  onOpenHandler: () => void;
  label: string;
  [key: string]: any;
}

const AppMultiSelectDropDown: React.FC<AppMultiSelectDropDownProps> = ({ label, onChangeHandler, data, ...props }) => {
  const handleClean = (event: any) => {
    if (props.onCleanHandler) props.onCleanHandler(event);
  };
  return (
    <>
      <div className="multiselect-dropdown-wrapper">
        <div className='dropdown-label'><span>{label}</span></div>
        <div className={`${props.isOpen ? "is-dropdown-open" : ""} check-picker-wrap`}>
          <CheckPicker
            block
            placeholder={props.placeholder}
            onChange={onChangeHandler}
            size="lg"
            onOpen={props.onOpenHandler}
            onClose={props.onCloseHandler}
            onClean={handleClean}
            data={data}
            searchable={false}
            style={{ width: 224 }}
          />
        </div>
      </div>
    </>
  );
};

export default AppMultiSelectDropDown;