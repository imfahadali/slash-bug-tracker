import React from "react";

type Props = {};

const Welcome = (props: Props) => {
  return (
    <div className="flex-6 flex items-center overflow-y-auto flex-col box-border mt-20 gap-5">
      <h1 className="text-5xl font-bold bg-gradient-to-r from-black via-blue-900 to-blue-500 text-transparent bg-clip-text">
        Slash
      </h1>

      <div className="bg-gradient-to-r from-blue-500 font-medium via-blue-700 to-blue-900 italic bg-clip-text text-transparent">
        Welcome to our bug tracker! We're glad you're here. Our mission is to
        help you report and track issues, so we can work together to make our
        product better. With this tool, you can easily submit bugs and feature
        requests, track their status, and communicate with our team. We
        encourage you to take advantage of all the features available, and
        please don't hesitate to reach out to us if you have any questions or
        feedback. Thank you for using our bug tracker, and we look forward to
        working with you!{" "}
      </div>
    </div>
  );
};

export default Welcome;
