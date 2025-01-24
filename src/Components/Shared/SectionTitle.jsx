/* eslint-disable react/prop-types */

const SectionTitle = ({heading , subHeading}) => {
    return (
        <div className="space-y-3 my-16 font-inter md:max-w-3xl mx-auto text-center">
            <p className="text-blue-500 text-lg italic">--- {subHeading} ---</p>
            <p className="uppercase text-2xl py-4 border-y-4">{heading}</p>
        </div>
    );
};

export default SectionTitle;