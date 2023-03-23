import {
  Drawer,
  Toolbar,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
} from '@mui/material';
import { FC, ReactElement } from 'react';
import { LocalOffer, PriceCheck, ReceiptLong } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';

const drawerWidth = 240;

const SideNavigation: FC = (): ReactElement => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          <Box sx={{ p: 2 }}>
            <Typography variant="caption" gutterBottom>
              Admin
            </Typography>
          </Box>
          <ListItem disablePadding>
            <ListItemButton
              component={NavLink}
              to={'/admin/products'}
              activeClassName="Mui-selected"
            >
              <ListItemIcon>
                <LocalOffer />
              </ListItemIcon>
              <ListItemText primary="Edit Pricing Plans" />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          <Box sx={{ p: 2 }}>
            <Typography variant="caption" gutterBottom>
              Account
            </Typography>
          </Box>
          <ListItem disablePadding>
            <ListItemButton
              component={NavLink}
              to={'/products'}
              activeClassName="Mui-selected"
            >
              <ListItemIcon>
                <PriceCheck />
              </ListItemIcon>
              <ListItemText primary="Pricing Plans" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={NavLink}
              to={'/billing'}
              activeClassName="Mui-selected"
            >
              <ListItemIcon>
                <ReceiptLong />
              </ListItemIcon>
              <ListItemText primary="Billing" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default SideNavigation;
