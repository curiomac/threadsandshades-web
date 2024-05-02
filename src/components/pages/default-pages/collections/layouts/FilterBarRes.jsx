import React, { useState } from "react";
import { MdSort } from "react-icons/md";
import { IoFilter } from "react-icons/io5";
import FilterBar from "./FilterBar";
import { IoClose } from "react-icons/io5";
import DomRender from "../../../../plugins/cmac-plugins/dom-render/DomRender";
import SideDragger from "../../../../plugins/cmac-plugins/side-dragger/SideDragger";
const FilterBarRes = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (toggle) => {
    setIsOpen(toggle);
  };
  return (
    <div>
      <DomRender>
        <div className="filter-bar-res">
          <div className="filter-bar-res-tab">
            <div className="sort d-flex align-items-center gap-2">
              <div>
                <MdSort className="d-flex align-items-center font-size-2-h" />
              </div>
              <div>SORT</div>
            </div>
            <div
              className="filter d-flex align-items-center gap-2"
              onClick={() => toggleDrawer(true)}
            >
              <div>
                <IoFilter className="d-flex align-items-center font-size-2-h" />
              </div>
              <div>FILTER</div>
            </div>
          </div>
        </div>
        {/* <div className="filter-drawer">
        <div className={`side-drawer ${isOpen ? "open" : ""}`}>
          <div className="links-container-res">
            <div className="mt-5">
              <div className="filter-close-ic">
                <IoClose onClick={() => setIsOpen(false)} />
              </div>
              <FilterBar toggleDrawer={toggleDrawer} />
            </div>
          </div>
        </div>
      </div> */}
      </DomRender>

      <SideDragger
        dragPosition={"left"}
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className={'filter-res'}
      >
        <FilterBar toggle={toggleDrawer} resBar={true}/>
      </SideDragger>
    </div>
  );
};

export default FilterBarRes;
