import Link from "next/link";
import Style from "../static/Style";
export default () => <div>
    {Style}
    <h1>Next.js</h1>
    <div>Welcome!!</div>
    <div>
        <Link href="/other">
            <a>Goto other page</a>
        </Link>
    </div>
</div>
