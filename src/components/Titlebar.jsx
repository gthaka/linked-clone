import React from "react";

export default function Titlebar({ title, others }) {
  let button = '';

  if (others && others.button) {
    button = others.button;
  }
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">{title}{button}</h1>
      </div>
    </header>
  );
}
