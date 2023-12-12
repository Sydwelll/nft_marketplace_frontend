import { useZustandStore } from "@/hooks/useZustandStore";
import Image from "next/image";


const KYBInformation = () => {
  const kybData = useZustandStore((state: any) => state.currentUser);

  return (
    <div className="px-4 py-6 sm:p-6 lg:pb-8">
      <div>
        <h2 className="text-lg font-medium leading-6 text-gray-900">
          KYB Informations
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          This information will be displayed publicly so be careful what you
          share.
        </p>
      </div>

      <div className="mt-6 flex flex-col lg:flex-row">
        <div className="flex-grow space-y-6">
          <div className="mt-6 space-y-6">
            <div>
              <span className="block text-sm font-medium leading-6 text-gray-900">
                Legal Entity Name
              </span>
              <p className="mt-1 text-sm text-gray-900">
                {kybData.legalEntityName}
              </p>
            </div>

            <div>
              <span className="block text-sm font-medium leading-6 text-gray-900">
                Alternate Name
              </span>
              <p className="mt-1 text-sm text-gray-900">
                {kybData.alternateName}
              </p>
            </div>

            <div>
              <span className="block text-sm font-medium leading-6 text-gray-900">
                Registered Business Address
              </span>
              <p className="mt-1 text-sm text-gray-900">
                {kybData.registeredBusinessAddress}
              </p>
            </div>

            <div>
              <span className="block text-sm font-medium leading-6 text-gray-900">
                City
              </span>
              <p className="mt-1 text-sm text-gray-900">{kybData.city}</p>
            </div>

            <div>
              <span className="block text-sm font-medium leading-6 text-gray-900">
                Zip/Postal Code
              </span>
              <p className="mt-1 text-sm text-gray-900">{kybData.zipCode}</p>
            </div>

            <div>
              <span className="block text-sm font-medium leading-6 text-gray-900">
                About
              </span>
              <p className="mt-1 text-sm text-gray-900">{kybData.about}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex-grow lg:ml-6 lg:mt-0 lg:flex-shrink-0 lg:flex-grow-0">
          <p
            className="text-sm font-medium leading-6 text-gray-900"
            aria-hidden="true"
          >
            Profile picture
          </p>
          <div className="mt-2 lg:hidden">
            <div className="flex items-center">
              <div
                className="inline-block h-12 w-12 flex-shrink-0 overflow-hidden rounded-full"
                aria-hidden="true"
              >
                <Image
                  className="h-full w-full rounded-full"
                  src={kybData.profilePictureUrl}
                  alt=""
                  width={100}
                  height={100}
                />
              </div>
              <div className="relative ml-5">
                <input
                  id="mobile-user-photo"
                  name="user-photo"
                  type="file"
                  className="peer absolute h-full w-full rounded-md opacity-0 bg-white"
                />
                <label
                  htmlFor="mobile-user-photo"
                  className="pointer-events-none block rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 peer-hover:ring-gray-400 peer-focus:ring-2 peer-focus:ring-sky-500"
                >
                  <span>Change</span>
                  <span className="sr-only"> user photo</span>
                </label>
              </div>
            </div>
          </div>

          <div className="relative hidden overflow-hidden rounded-full lg:block">
            <Image
              className="relative h-40 w-40 rounded-full"
              src={kybData.profilePictureUrl}
              alt=""
              height={100}
              width={100}
            />
            <label
              htmlFor="desktop-user-photo"
              className="absolute inset-0 flex h-full w-full items-center justify-center bg-black bg-opacity-75 text-sm font-medium text-white opacity-0 focus-within:opacity-100 hover:opacity-100"
            >
              <span>Change</span>
              <span className="sr-only"> user photo</span>
              <input
                type="file"
                id="desktop-user-photo"
                name="user-photo"
                className="absolute bg-white inset-0 h-full w-full cursor-pointer rounded-md border-gray-300 opacity-0"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KYBInformation;
