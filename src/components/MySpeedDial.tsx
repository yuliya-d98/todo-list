import CreateIcon from '@mui/icons-material/Create';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import { useState, memo } from 'react';

type MySpeedDialProps = {
  setIsModalVisible: (isModalVisible: boolean) => void;
};

const MySpeedDial = memo(({ setIsModalVisible }: MySpeedDialProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const createNewTodo = () => {
    setIsModalVisible(true);
  };

  const actions = [{ icon: <CreateIcon />, name: 'Create', callback: createNewTodo }];

  return (
    <SpeedDial
      ariaLabel="SpeedDial tooltip"
      sx={{ position: 'fixed', bottom: 16, right: 16 }}
      icon={<SpeedDialIcon />}
      onClose={handleClose}
      onOpen={handleOpen}
      open={isOpen}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          tooltipOpen
          onClick={action.callback}
        />
      ))}
    </SpeedDial>
  );
});

export default MySpeedDial;
