"use client";

import { Sidebar } from "flowbite-react";
import { HiMiniMapPin } from "react-icons/hi2";

import logo from "../assets/logo.png";

export function PinSidebar() {
  return (
    <Sidebar
      aria-label="Sidebar with logo branding example"
      className="h-screen"
    >
      <Sidebar.Logo href="#" img={logo} imgAlt="Reemaarks logo">
        Reemaarks
      </Sidebar.Logo>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="#" icon={HiMiniMapPin}>
            Pin #1 : Bangalore
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiMiniMapPin}>
            Pin #2 : Delhi
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiMiniMapPin}>
            Pin #3 : Kochi
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiMiniMapPin}>
            Pin #4 : Pune
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiMiniMapPin}>
            Pin #5 : Chennai
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
