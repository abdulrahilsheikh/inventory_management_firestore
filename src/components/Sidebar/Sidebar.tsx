import style from "./Sidebar.module.scss";
type SidebarProps = {
	list: string[];
	changeTab: (data: string) => void;
};
function Sidebar({ changeTab, list }: SidebarProps) {
	return (
		<div className={style.sideBarContainer}>
			{list.map((a) => (
				<div onClick={() => changeTab(a)}>{a}</div>
			))}
		</div>
	);
}

export default Sidebar;
