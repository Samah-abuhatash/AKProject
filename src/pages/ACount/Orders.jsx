import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  IconButton,
  Collapse,
} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState("");
  const [openRows, setOpenRows] = useState({});

   const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'));

  useEffect(() => {
    async function fetchOrders() {
      try {
        const token = localStorage.getItem("userToken");
        if (!token) {
          setError("No token found, please login first.");
          setLoading(false);
          return;
        }

        const { data } = await axios.get(
          "https://mytshop.runasp.net/api/Orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setOrders(data);
      } catch (err) {
        setError("Failed to fetch orders. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString || dateString.startsWith("0001")) return "N/A";
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const renderStatusChip = (status) => {
    const colorMap = {
      Pending: "warning",
      Shipped: "success",
      Cancelled: "error",
      Delivered: "primary",
    };
    return (
      <Chip
        label={status}
        color={colorMap[status] || "default"}
        variant="outlined"
        size="small"
      />
    );
  };

  const handleShowDetails = async (orderId) => {
    setDetailsError("");
    setDetailsLoading(true);
    setSelectedOrder(null);

    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        setDetailsError("No token found, please login first.");
        setDetailsLoading(false);
        return;
      }
      const { data } = await axios.get(
        `https://mytshop.runasp.net/api/Orders/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSelectedOrder(data);
    } catch (err) {
      setDetailsError("Failed to load order details.");
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleCloseDetails = () => {
    setSelectedOrder(null);
    setDetailsError("");
  };

 
  const toggleRow = (id) => {
    setOpenRows(prev => ({ ...prev, [id]: !prev[id] }));
  };

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress size={60} />
      </Box>
    );

  if (error)
    return (
      <Typography
        color="error"
        textAlign="center"
        variant="h6"
        mt={5}
        mx="auto"
        maxWidth={600}
      >
        {error}
      </Typography>
    );

  if (orders.length === 0)
    return (
      <Typography
        variant="h6"
        textAlign="center"
        mt={5}
        color="text.secondary"
        maxWidth={600}
        mx="auto"
      >
        No orders found.
      </Typography>
    );

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", mt: 6, p: 3 }}>
      <Typography variant="h4" fontWeight="bold" mb={3} textAlign="center">
        My Orders
      </Typography>

      {!isMobile ? (
       
        <TableContainer
          component={Paper}
          elevation={5}
          sx={{ maxWidth: "100%", overflowX: "auto" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="orders table">
            <TableHead sx={{ bgcolor: "#1976d2" }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Order ID
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Status
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Order Date
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Shipped Date
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }} align="right">
                  Total Price (₪)
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }} align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {orders.map((order) => (
                <TableRow
                  key={order.id}
                  hover
                  sx={{ cursor: "pointer" }}
                  title="Click for more details"
                >
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{renderStatusChip(order.orderStatus)}</TableCell>
                  <TableCell>{formatDate(order.orderDate)}</TableCell>
                  <TableCell>{formatDate(order.shippedDate)}</TableCell>
                  <TableCell align="right">
                    ₪{order.totalPrice.toLocaleString()}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleShowDetails(order.id)}
                    >
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box>
          {orders.map((order) => (
            <Paper
              key={order.id}
              elevation={3}
              sx={{ mb: 2, p: 2, borderRadius: 2, boxShadow: 3 }}
            >
              <Box
                sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
              >
                <Typography fontWeight="bold">Order #{order.id}</Typography>
                <IconButton
                  size="small"
                  onClick={() => toggleRow(order.id)}
                  aria-label="expand row"
                >
                  {openRows[order.id] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </Box>

              <Collapse in={openRows[order.id]} timeout="auto" unmountOnExit>
                <Box mt={1}>
                  <Typography>Status: {renderStatusChip(order.orderStatus)}</Typography>
                  <Typography>Order Date: {formatDate(order.orderDate)}</Typography>
                  <Typography>Shipped Date: {formatDate(order.shippedDate)}</Typography>
                  <Typography>Total Price: ₪{order.totalPrice.toLocaleString()}</Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ mt: 1 }}
                    onClick={() => handleShowDetails(order.id)}
                  >
                    Details
                  </Button>
                </Box>
              </Collapse>
            </Paper>
          ))}
        </Box>
      )}
      <Dialog
        open={Boolean(selectedOrder) || detailsLoading || detailsError}
        onClose={handleCloseDetails}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent dividers>
          {detailsLoading && (
            <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
              <CircularProgress />
            </Box>
          )}

          {detailsError && (
            <Typography color="error" textAlign="center">
              {detailsError}
            </Typography>
          )}

          {selectedOrder && (
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Order ID:</strong> {selectedOrder.id}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Status:</strong> {renderStatusChip(selectedOrder.orderStatus)}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Order Date:</strong> {formatDate(selectedOrder.orderDate)}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Shipped Date:</strong> {formatDate(selectedOrder.shippedDate)}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Total Price:</strong> ₪{selectedOrder.totalPrice.toLocaleString()}
              </Typography>

              <Divider sx={{ my: 2 }} />

              {selectedOrder.orderItems && selectedOrder.orderItems.length > 0 ? (
                <>
                  <Typography variant="h6" gutterBottom>
                    Products
                  </Typography>
                  <List dense>
                    {selectedOrder.orderItems.map((item, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={`${item.productName} - ₪${item.price.toLocaleString()}`}
                          secondary={`Quantity: ${item.quantity}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </>
              ) : (
                <Typography color="text.secondary">
                  No product details available for this order.
                </Typography>
              )}
            </Box>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDetails}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Orders;
