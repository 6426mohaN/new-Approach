import { clerkClient } from "@clerk/nextjs/server";
import { removeRole, setRole } from "./actions";

export default async function Admin(){
  const client = await clerkClient();
  const users = (await client.users.getUserList()).data;
  return (
    <>
      {users.map((user) => {
        return (
          <div 
          key={user.id}
          className={`flex items-center justify-between gap-4 p-4 ${users.indexOf(user) % 2 === 0 
            ? "bg-neutral-50 dark:bg-neutral-800"
            : "bg-white dark:bg-neutral-900"
          }`}
          >
          <div className = 'flex gap-8'>
            <div >
            {user.firstName} {user.lastName}
            </div>
            <div >
            {user.emailAddresses.find(
              (email) => email.id === user.primaryEmailAddressId
            )?.emailAddress}
            </div>
            <div >
            {user.publicMetadata.role as string}
            </div>
            </div>
            <div className = 'flex gap-2'>
            <form action={setRole} className = 'inline'>
              <input type="hidden" name="id" value={user.id} />
              <input type="hidden" name="role" value="teacher" />
              <button 
              type="submit" 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Make Teacher
              </button>
            </form>
            

            {/* <form action={setRole} className = 'inline'>
              <input type="hidden" name="id" value={user.id} />
              <input type="hidden" name="role" value="admin" />
              <button 
              type="submit" 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Make Teacher
              </button>
            </form> */}

            <form action={removeRole} className = 'inline'>
              <input type="hidden" name="id" value={user.id} />
              <button 
              type="submit" 
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Remove Role
              </button>
            </form>
            </div>
          </div>
          
          
        )
        })}
    </>
  )
}
        