import Image from "next/image"
import Link from "next/link"
import { currentUser } from "@clerk/nextjs"

export default async function ViewPage() {
  const user = await currentUser()

  return (
    <div className="container mx-auto">
      <div className="flex">
        <div className="relative mx-4 aspect-square">
          <Image
            src={user?.profileImageUrl}
            alt={`${user?.firstName} ${user?.lastName}`}
            fill
            className="rounded-lg"
          />
        </div>

        <div className="ml-4">
          <div className="-mx-4 overflow-x-auto p-4 sm:-mx-8 sm:px-8">
            <div className="inline-block w-full overflow-hidden rounded-lg shadow-md">
              <table className="w-full leading-normal">
                <tbody>
                  {/* Firstname */}

                  <tr>
                    <td className="whitespace-no-wrap border-b border-gray-200 bg-white p-5 text-sm text-gray-900">
                      First Name
                    </td>

                    <td className="whitespace-no-wrap border-b border-gray-200 bg-white p-5 text-sm text-gray-900">
                      {user.firstName}
                    </td>
                  </tr>

                  {/* Last Name */}

                  <tr>
                    <td className="whitespace-no-wrap border-b border-gray-200 bg-white p-5 text-sm text-gray-900">
                      Last Name
                    </td>

                    <td className="whitespace-no-wrap border-b border-gray-200 bg-white p-5 text-sm text-gray-900">
                      {user.lastName}
                    </td>
                  </tr>

                  {/* Emails */}

                  <tr>
                    <td className="whitespace-no-wrap border-b border-gray-200 bg-white p-5 text-sm text-gray-900">
                      Emails
                    </td>

                    <td className="whitespace-no-wrap border-b border-gray-200 bg-white p-5 text-sm text-gray-900">
                      {user.emailAddresses.map((email) => (
                        <div key={email.emailAddress}>
                          {email.emailAddress},{" "}
                        </div>
                      ))}
                    </td>
                  </tr>

                  {/* Unsafe Metadata Example */}

                  <tr>
                    <td className="whitespace-no-wrap border-b border-gray-200 bg-white p-5 text-sm text-gray-900">
                      Custom Name
                    </td>

                    <td className="whitespace-no-wrap border-b border-gray-200 bg-white p-5 text-sm text-gray-900">
                      {user.unsafeMetadata.customName}
                    </td>
                  </tr>

                  <tr>
                    <td className="whitespace-no-wrap border-b border-gray-200 bg-white p-5 text-sm text-gray-900">
                      Custom Bio
                    </td>

                    <td className="whitespace-no-wrap border-b border-gray-200 bg-white p-5 text-sm text-gray-900">
                      {user.unsafeMetadata.customBio}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-center">
            <Link href={"/additional"}>
              <button className="mt-4 bg-purple-600 px-4 py-2 font-bold text-white transition-all hover:bg-purple-800">
                Update Additional Information
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
