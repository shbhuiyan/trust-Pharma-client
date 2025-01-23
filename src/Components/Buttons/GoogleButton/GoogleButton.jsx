const GoogleButton = () => {
  return (
    <button className="w-full flex items-center justify-center gap-2 py-3 transition-all border rounded-lg shadow hover:shadow-md border-gray-300 bg-white">
      <img src="https://docs.material-tailwind.com/icons/google.svg" alt="Google Logo" className="w-6 h-6" />
      <span className="text-base text-gray-600 font-semibold ">
        Login with Google
      </span>
    </button>
  );
};

export default GoogleButton;
