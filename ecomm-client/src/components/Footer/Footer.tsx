import FacebookIcon from "../common/FacebookIcon";
import InstagramIcon from "../common/InstagramIcon";

type FooterProps = {
    content: {
        items: Item[];
        copyright: string;
    };
};
type Item = {
    title: string;
    list?: ListItem[];
    description?: string;
};
type ListItem = {
    label: string;
    path: string;
};


const Footer = ({ content }: FooterProps) => {
    return (
        <div className='bg-black text-white'>
            <div className='flex p-8 justify-between'>
                {content.items?.map((item, _index) => (
                    <div key={_index} className="flex flex-col">
                        <p className="text-xl pb-[10px]">{item.title}</p>
                        {item.list?.map((listItem, index) => (
                            <a key={index} className='flex flex-col text-[14px] py-2' href={listItem.path}>{listItem.label}</a>
                        ))}
                        {item?.description && <p>{item.description}</p>}
                    </div>
                ))}
            </div>
            <div className="flex gap-2 items-center justify-center py-4 cursor-pointer">
                <a href="/insta"><InstagramIcon /></a>
                <a href="/fb"><FacebookIcon /></a>

            </div>
            <p className='text-xl text-white text-center content-center font-bold'>{content.copyright}</p>

        </div>
    );
};

export default Footer;
