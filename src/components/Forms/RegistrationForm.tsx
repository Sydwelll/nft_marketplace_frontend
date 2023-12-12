"use client";

import { useState } from "react";
import Stepper from "../Stepper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhotoFilm, faUser } from "@fortawesome/pro-duotone-svg-icons";

const BusinessInformation = () => (
  <div className="p-6">
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-gray-900">
        Business Information
      </h2>
      <p className="mt-1 text-sm text-gray-500">
        Fill in the details about your business.
      </p>
    </div>
    <form className="space-y-6">
      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="legal-entity-name"
            className="block text-sm font-medium text-gray-700"
          >
            Legal Entity Name
          </label>
          <input
            type="text"
            name="legal-entity-name"
            id="legal-entity-name"
            autoComplete="organization"
            className="mt-1 block w-full text-gray-700 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div className="col-span-6">
          <label
            htmlFor="alternate-name"
            className="block text-sm font-medium text-gray-700"
          >
            Alternate Name e.g., Doing Business As (DBA) or Trade name
          </label>
          <input
            type="text"
            name="alternate-name"
            id="alternate-name"
            autoComplete="off"
            className="mt-1 block w-full text-gray-700 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div className="col-span-6">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Registered Business Address
          </label>
          <input
            type="text"
            name="address"
            id="address"
            autoComplete="street-address"
            className="mt-1 block w-full text-gray-700 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700"
          >
            City
          </label>
          <input
            type="text"
            name="city"
            id="city"
            autoComplete="address-level2"
            className="mt-1 block w-full text-gray-700 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="postal-code"
            className="block text-sm font-medium text-gray-700"
          >
            ZIP/Postal Code
          </label>
          <input
            type="text"
            name="postal-code"
            id="postal-code"
            autoComplete="postal-code"
            className="mt-1 block w-full text-gray-700 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        {/* ... Other form fields as per the image ... */}

        {/* Example for Yes/No question */}

        <fieldset className="mt-4 col-span-6">
          <legend className="text-sm font-medium text-gray-700">
            Is this address where your company physically conducts its business?
          </legend>
          <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
            <div className="flex items-center">
              <input
                id="physical-location-yes"
                name="physical-location"
                type="radio"
                defaultChecked
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label
                htmlFor="physical-location-yes"
                className="ml-3 block text-sm font-medium text-gray-700"
              >
                Yes
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="physical-location-no"
                name="physical-location"
                type="radio"
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label
                htmlFor="physical-location-no"
                className="ml-3 block text-sm font-medium text-gray-700"
              >
                No
              </label>
            </div>
          </div>
        </fieldset>
      </div>
    </form>
  </div>
);

const FinancialInformation = () => (
  <div className="px-4 py-6 sm:p-6 lg:pb-8">
    <h2 className="text-lg font-medium leading-6 text-gray-900">
      Financial Information
    </h2>
    <p className="mt-1 text-sm text-gray-500">
      Enter financial details for your business.
    </p>
    {/* Fields for Financial Information */}
  </div>
);

const BusinessRegistrationInformation = () => (
  <div className="px-4 py-6 sm:p-6 lg:pb-8">
    <h2 className="text-lg font-medium leading-6 text-gray-900">
      Business Registration Information
    </h2>
    <p className="mt-1 text-sm text-gray-500">
      Provide your business registration details.
    </p>
    {/* Fields for Business Registration Information */}
  </div>
);

const AccountActivity = () => (
  <div className="px-4 py-6 sm:p-6 lg:pb-8">
    <h2 className="text-lg font-medium leading-6 text-gray-900">
      Account Activity
    </h2>
    <p className="mt-1 text-sm text-gray-500">
      Describe the expected account activity.
    </p>
    {/* Fields for Account Activity */}
  </div>
);

export const KYBForm = () => {
  const [currentStatus, setCurrentStatus] = useState(0);

  const handleStepClick = (stepIndex: number) => {
    setCurrentStatus(stepIndex);
  };

  const WorkflowStatus: any = {
    BUSINESS_INFORMATION: "Business Information",
    BUSINESS_REGISTRATION: "Business Registration",
    FINANCIAL_INFORMATION: "Financial Information",
    ACCOUNT_ACTIVITY: "Account Activity",
  };

  const steps = Object.keys(WorkflowStatus).map((statusKey, index) => ({
    id: index + 1, // ID is the index, starting from 0
    name: WorkflowStatus[statusKey],
    description: `Description for ${WorkflowStatus[statusKey]}`,
    status:
      index === currentStatus
        ? "current"
        : index < currentStatus
        ? "complete"
        : "upcoming",
  }));

  const renderStepContent = (status: number) => {
    switch (status) {
      case 0:
        return <BusinessInformation />;
      case 1:
        return <FinancialInformation />;
      case 2:
        return <BusinessRegistrationInformation />;
      case 3:
        return <AccountActivity />;
      default:
        return <div>Not Found</div>;
    }
  };

  return (
    <div>
      <main className="w-full">
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-white shadow">
            <Stepper steps={steps} onStepClick={handleStepClick} />
            <form className="divide-y divide-gray-200 lg:col-span-9">
              {renderStepContent(currentStatus)}

              {/* Action Buttons */}
              <div className="mt-6 px-4 py-4 sm:px-6 flex justify-end">
                <button
                  type="button"
                  className="mr-3 inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 bg-white text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 bg-sky-600 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};
