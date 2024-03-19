interface Props {
    searchParams: {
        token: string;
        userId: string;
    };
}

const Verify = (props: Props) => {
    const { token, userId } = props.searchParams;

    //verify token and userId

    return (
        <div className="text-3xl opacity-70 text-center p-5 animate-pulse">
            Please wait...
            <p>We are verifying your email</p>
        </div>
    );
};

export default Verify;
