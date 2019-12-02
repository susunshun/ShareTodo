import Link from "next/link";
import Style from "../static/Style";

export default () => <div>
    {Style}
    <h1>other Next.js</h1>
    <p>this is other page</p>
    <div>
        <Link href="/">
            <a>back to index page</a>
        </Link>
    </div>
</div>