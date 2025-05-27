"use client";

import { useState } from "react";
import Button from "../ui/Button";
import {
  FaChevronLeft,
  FaChevronRight,
  FaCloudArrowDown,
  FaTrash,
  FaTrashCan,
} from "react-icons/fa6";
import { FaRegTrashAlt, FaTrashAlt, FaTrashRestoreAlt } from "react-icons/fa";

const AdminOrderEditor = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [price, setPrice] = useState("");
  const [creationDate, setCreationDate] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [file, setFile] = useState(null);
  const [notes, setNotes] = useState("");

  return (
    <div className="relative max-lg:w-xs w-[50%] h-full text-center lg:-mr-28 !pointer-events-auto">
      <img
        className="size-8 lg:size-10 absolute z-50 -top-4 lg:-top-6 left-0 right-0 mx-auto"
        src="/images/icons/cart.svg"
        alt=""
      />
      <div className="order-bg w-full h-full max-2xl:bg-[#17171791] backdrop-blur-xs py-8 lg:pt-12 2xl:pt-16 px-5 lg:px-8 flex flex-col justify-between items-center">
        <div className="w-full flex justify-between items-center">
          <h3 className="text-lg lg:text-xl 2xl:text-3xl font-bold">
            Order Editor
          </h3>
          <FaTrash size={20} className="text-primary" />
        </div>

        <div className="w-full mt-4 space-y-2 2xl:space-y-3 text-sm">
          {/* Static Fields */}
          <div className="flex justify-between items-center max-2xl:text-xs">
            <p className="text-[#7F7F7F]">Category</p>
            <p>Development</p>
          </div>
          <div className="flex justify-between items-center max-2xl:text-xs">
            <p className="text-[#7F7F7F]">Order ID</p>
            <p>550e8400-e29b-41d4-a716-446655440000</p>
          </div>

          {/* Editable Fields */}
          <div className="flex justify-between items-center max-2xl:text-xs">
            <label className="text-[#7F7F7F] mr-4">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input input-bordered w-[45%] text-right"
              placeholder="Enter title"
            />
          </div>

          <div className="flex justify-between items-center max-2xl:text-xs">
            <label className="text-[#7F7F7F] mr-4">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input input-bordered w-[45%] text-right"
              placeholder="Enter description"
            />
          </div>

          <div className="flex justify-between items-center max-2xl:text-xs">
            <label className="text-[#7F7F7F] mr-4">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="select select-bordered w-[45%] text-right"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div className="flex justify-between items-center max-2xl:text-xs">
            <label className="text-[#7F7F7F] mr-4">Price ($)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="input input-bordered w-[45%] text-right"
              placeholder="Enter price"
            />
          </div>

          <div className="flex justify-between items-center max-2xl:text-xs">
            <label className="text-[#7F7F7F] mr-4">Creation Date</label>
            <input
              type="date"
              value={creationDate}
              onChange={(e) => setCreationDate(e.target.value)}
              className="input input-bordered w-[45%] text-right"
            />
          </div>

          <div className="flex justify-between items-center max-2xl:text-xs">
            <label className="text-[#7F7F7F] mr-4">
              Estimated Delivery Date
            </label>
            <input
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              className="input input-bordered w-[45%] text-right"
            />
          </div>
          <div className="flex justify-between items-center max-2xl:text-xs">
            <label className="text-[#7F7F7F] mr-4">Attach File</label>
            <input
              type="file"
              onChange={(e) => {
                if (e.target.files?.[0]) setFile(e.target.files[0]);
              }}
              className="file-input file-input-bordered w-[45%]"
            />
          </div>
          {file && (
            <div className="text-xs text-right text-[#999] w-full">
              Selected File: {file.name}
            </div>
          )}

          <div className="flex justify-between items-center max-2xl:text-xs">
            <label className="text-[#7F7F7F] mr-4">Internal Notes</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="input input-bordered w-[45%] text-right"
              placeholder="Add notes"
            />
          </div>
        </div>
        <div className="flex gap-4 items-center justify-between">
          <FaChevronLeft size={14} />
          <div className="flex flex-col items-center bg-black py-3 px-6 rounded-4xl justify-center space-y-2">
            <FaCloudArrowDown
              size={28}
              className="max-2xl:size-6 text-[#eb5939] scale-x-[-1]"
            />
            <div className="text-center">
              <div className="text-sm text-[#BABABA] font-light">
                paxerr.zip
              </div>
              <div className="text-xs text-[#7F7F7F] font-light">11.11 MB</div>
            </div>
          </div>
          <FaChevronRight size={14} />
        </div>

        <div className="mt-auto">
          <Button
            type="outline"
            className="max-lg:hidden mb-0 lg:my-4 w-[190px] mx-auto"
            onClick={() => {
              // Save logic here
              console.log({
                title,
                description,
                status,
                price,
                creationDate,
                deliveryDate,
              });
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderEditor;
