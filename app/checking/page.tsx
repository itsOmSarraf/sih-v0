import { checkUserAndRedirect } from "app/actions/accountCheck";

export default async function Checking() {
    await checkUserAndRedirect()
    return (
        <div>
            Fetching Account Details
        </div>
    )
}