function Nav() {
  const groups = [
    {
      name: '브루트 포스 (Brute Force)',
      groupItems: [
        { name: '버블 정렬 (Bubble Sort)', to: 'bubble-sort' },
        { name: '삽입 정렬 (Insertion Sort)', to: 'insertion-sort' },
        { name: '선택 정렬 (Selection Sort)', to: 'selection-sort' },
      ],
    },
  ];

  return (
    <aside className="border-r-1 sticky left-0 top-14 flex h-[calc(100vh-3.5rem)] min-w-[300px] flex-col items-center overflow-y-scroll border-r border-solid border-gray-200 px-8 pt-6">
      <div className="flex h-full w-full flex-col">
        {groups.map((group, groupIndex) => {
          return (
            <>
              <div key={groupIndex} className="py-3 font-bold">
                {group.name}
              </div>
              <ul>
                {group.groupItems.map((groupItem, index) => (
                  <li
                    key={index}
                    className="border-l border-solid border-gray-300 px-2 py-2 font-medium hover:border-gray-500 hover:font-semibold"
                  >
                    {/* <Link to={'/' + groupItem.to}>{groupItem.name}</Link> */}
                  </li>
                ))}
              </ul>
            </>
          );
        })}
      </div>
    </aside>
  );
}

export default Nav;
