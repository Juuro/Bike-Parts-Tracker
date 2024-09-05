import addInstallation from "@/app/actions/addInstallation";
import { fetchManufacturers } from "@/utils/requests";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  title?: string;
  showCloseButton?: boolean;
  bike: any;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  showCloseButton = true,
  bike,
  children,
}) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [manufacturers, setManufacturers] = useState([]);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      fetchManufacturers(setManufacturers);
    }
  }, [status]);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeydown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; // Format as YYYY-MM-DD
    setSelectedDate(formattedDate);
  }, []);

  if (!isOpen) return null;
  // if (false) return null;

  return ReactDOM.createPortal(
    <div
      tabIndex="-1"
      aria-hidden="true"
      className="modal-overlay overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-gray-900/50 flex justify-center"
      onClick={onClose}
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            {title && (
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {title}
              </h3>
            )}

            {showCloseButton && (
              <button
                type="button"
                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="authentication-modal"
                onClick={onClose}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            )}
          </div>

          <div className="p-4 md:p-5">
            <form action={addInstallation}>
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="bike"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Bike
                  </label>
                  <select
                    name="bike"
                    id="bike"
                    defaultValue={bike.id}
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option value="" disabled hidden>
                      Select bike
                    </option>
                    <option value={bike.id}>{bike.name}</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="manufacturer"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Manufacturer
                  </label>
                  <select
                    name="manufacturer"
                    id="manufacturer"
                    defaultValue=""
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option value="" disabled hidden>
                      Select manufacturer
                    </option>
                    {manufacturers.length == 0 ? (
                      <p>No parts found</p>
                    ) : (
                      manufacturers.map((manufacturer) => {
                        return (
                          <option key={manufacturer.id} value={manufacturer.id}>
                            {manufacturer.name}
                          </option>
                        );
                      })
                    )}
                  </select>
                </div>
                <div className="col-span-1">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Model name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder=""
                    required
                  />
                </div>
                <div className="col-span-1">
                  <label
                    htmlFor="year"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Model year
                  </label>
                  <input
                    type="number"
                    name="year"
                    id="year"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="1985"
                    required
                  />
                </div>
                <div className="col-span-1">
                  <label
                    htmlFor="price"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Purchase price
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="399"
                    required
                  />
                </div>
                <div className="col-span-1">
                  <label
                    htmlFor="purchase_date"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Purchase date
                  </label>
                  <input
                    type="date"
                    name="purchase_date"
                    id="purchase_date"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder=""
                    required
                  />
                </div>
                <fieldset className="col-span-1">
                  <legend className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    For sale
                  </legend>
                  <p>
                    <input
                      name="sell_status"
                      type="radio"
                      id="for_sale"
                      className="mr-2 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-primary-600 focus:border-primary-600"
                      value="for_sale"
                    />
                    <label htmlFor="for_sale">For sale</label>
                  </p>
                  <p>
                    <input
                      name="sell_status"
                      type="radio"
                      id="not_for_sale"
                      className="mr-2 bg-gray-50 border border-gray-300 text-gray-900"
                      value="not_for_sale"
                    />
                    <label htmlFor="not_for_sale">Not for sale</label>
                  </p>
                  <p>
                    <input
                      name="sell_status"
                      type="radio"
                      id="sold"
                      className="mr-2 bg-gray-50 border border-gray-300 text-gray-900"
                      value="sold"
                    />
                    <label htmlFor="sold">Sold</label>
                  </p>
                </fieldset>

                <div className="col-span-1">
                  <label
                    htmlFor="sell_price"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Sell price
                  </label>
                  <input
                    type="number"
                    name="sell_price"
                    id="sell_price"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="299"
                  />
                </div>
                <div className="col-span-1">
                  <label
                    htmlFor="secondhand"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Secondhand
                  </label>
                  <input
                    type="checkbox"
                    name="secondhand"
                    id="secondhand"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder=""
                    value="true"
                  />
                </div>
                <div className="col-span-1">
                  <label
                    htmlFor="shop_url"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Shop url
                  </label>
                  <input
                    type="text"
                    name="shop_url"
                    id="shop_url"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder=""
                  />
                </div>
                <div className="col-span-1">
                  <label
                    htmlFor="type"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Type
                  </label>
                  <select
                    name="type"
                    id="type"
                    defaultValue=""
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option value="" disabled hidden>
                      Select type of part
                    </option>
                    <option value="Frame">Frame</option>
                    <option value="Front Brake">Front Brake</option>
                    <option value="Handlebar">Handlebar</option>
                  </select>
                </div>
                <div className="col-span-1">
                  <label
                    htmlFor="weight"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Weight
                  </label>
                  <input
                    type="text"
                    name="weight"
                    id="weight"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder=""
                    required
                  />
                </div>
                <div className="col-span-1">
                  <label
                    htmlFor="installed_at"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Installation date
                  </label>
                  <input
                    type="date"
                    name="installed_at"
                    id="installed_at"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder=""
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="me-1 -ms-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Add new part
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
