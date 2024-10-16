import React, { useState, useEffect } from "react";
import Layout from "../components/Layouts/Layout";
import { Modal, Form, Input, Select, message, Table } from "antd";
import Spinner from "../components/Layouts/Spinner";
import axios from "axios";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  LogoutOutlined, // Add the logout icon from Ant Design
} from "@ant-design/icons";
import Analytics from "../components/Layouts/Analytics";
import { useNavigate } from "react-router-dom"; // Import useNavigate
const API_URL="http://localhost:8080/api/v1";
const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransaction, setAllTransaction] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [viewData, setViewData] = useState("table");
  const [editable, setEditable] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user data from local storage
    message.success("Logged out successfully");
    navigate("/login"); // Redirect to login page
  };

  // Function to fetch all transactions
  const getAllTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      const res = await axios.post(`${API_URL}/transactions/get-transaction`, {
        userid: user._id,
      });
      setLoading(false);
      setAllTransaction(res.data);
    } catch (error) {
      setLoading(false);
      message.error("Fetch Issue With Transaction");
    }
  };

  useEffect(() => {
    getAllTransactions();
  }, []);

  // Function to handle delete action
  const handleDelete = async (record) => {
    try {
      setLoading(true);
      await axios.post(`${API_URL}/transactions/delete-transaction`, {
        transactionId: record._id,
      });
      message.success("Transaction deleted");
      getAllTransactions(); // Fetch updated transactions
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("Unable to delete transaction");
    }
  };

  // Function to handle form submission for adding/editing transactions
  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      if (editable) {
        await axios.post(`${API_URL}/transactions/edit-transaction`, {
          payload: {
            ...values,
            userid: user._id,
            frequency,
          },
          transactionId: editable._id,
        });
        message.success("Transaction Updated Successfully");
      } else {
        await axios.post(`${API_URL}/transactions/add-transaction`, {
          ...values,
          userid: user._id,
          frequency,
        });
        message.success("Transaction Added Successfully");
      }
      setLoading(false);
      setShowModal(false);
      setEditable(null);
      getAllTransactions(); // Fetch updated transactions
    } catch (error) {
      setLoading(false);
      message.error("Failed to add transaction");
    }
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span className="table-text">{text}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (text) => <span className="table-text">{text}</span>,
    },
    {
      title: "Transaction Type",
      dataIndex: "type",
      render: (text) => <span className="table-text">{text}</span>,
    },
    {
      title: "Category",
      dataIndex: "category",
      render: (text) => <span className="table-text">{text}</span>,
    },
    {
      title: "Reference",
      dataIndex: "reference",
      render: (text) => <span className="table-text">{text}</span>,
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div>
          <EditOutlined
            onClick={() => {
              setEditable(record);
              setShowModal(true);
            }}
          />
          <DeleteOutlined
            className="mx-2"
            onClick={() => handleDelete(record)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="homepage-container">
      <Layout>
        {loading && <Spinner />}
        <div className="content-wrapper">
          <div className="filters glass-container">
            <div className="view-options">
              <button
                className="icon-button"
                onClick={() => setViewData("table")}
              >
                <UnorderedListOutlined style={{ color: 'white' }} />
              </button>
              <button
                className="icon-button"
                onClick={() => setViewData("analytics")}
              >
                <AreaChartOutlined style={{ color: 'white' }} />
              </button>
              <button
                className="add-button"
                onClick={() => setShowModal(true)}
              >
                <PlusOutlined /> Add New
              </button>
              <button
                className="add-button logout-button" // New logout button
                onClick={handleLogout}
              >
                <LogoutOutlined /> Logout
              </button>
            </div>
          </div>

          <div className="glass-container">
            {viewData === "table" ? (
              <Table
                columns={columns}
                dataSource={allTransaction}
                pagination={{
                  pageSize: 5,
                  showSizeChanger: true,
                  pageSizeOptions: ["5", "10", "20"],
                }}
                className="custom-table"
              />
            ) : (
              <Analytics allTransaction={allTransaction} />
            )}
          </div>

          {/* Modal Section */}
          <Modal
            title={editable ? "Edit Transaction" : "Add Transaction"}
            open={showModal}
            onCancel={() => setShowModal(false)}
            footer={false}
            className="custom-modal"
          >
            <Form
              layout="vertical"
              onFinish={handleSubmit}
              initialValues={editable}
            >
              <Form.Item
                label="Amount"
                name="amount"
                rules={[{ required: true, message: "Please input the amount!" }]}
              >
                <Input type="text" />
              </Form.Item>
              <Form.Item label="Transaction Type" name="type">
                <Select>
                  <Select.Option value="income">Income</Select.Option>
                  <Select.Option value="expense">Expense</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Category" name="category">
                <Select>
                  <Select.Option value="salary">Salary</Select.Option>
                  <Select.Option value="tip">Tip</Select.Option>
                  <Select.Option value="project">Project</Select.Option>
                  <Select.Option value="food">Food</Select.Option>
                  <Select.Option value="movie">Movie</Select.Option>
                  <Select.Option value="bills">Bills</Select.Option>
                  <Select.Option value="medical">Medical</Select.Option>
                  <Select.Option value="fee">Fee</Select.Option>
                  <Select.Option value="other">Other</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Date" name="date">
                <Input type="date" />
              </Form.Item>
              <Form.Item label="Payment Method" name="reference">
                <Input type="text" />
              </Form.Item>
              <Form.Item label="Description" name="description">
                <Input type="text" />
              </Form.Item>
              <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary save">
                  SAVE
                </button>
              </div>
            </Form>
          </Modal>
        </div>
      </Layout>
    </div>
  );
};

export default HomePage;
