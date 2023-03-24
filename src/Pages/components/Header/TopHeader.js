import React, { useState,useCallback } from "react";
import { CalendarOutlined,FullscreenOutlined,FullscreenExitOutlined } from "@ant-design/icons";
import { Layout, Anchor, Popover, Calendar } from "antd";
import "../index.scss";


const { Header } = Layout;
export default function TopHeader(props) {

  const [full, setFull] = useState(false);

  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  const changeFull = useCallback(() => {
    if (full) {
      document.exitFullscreen();
    } else {
      if (document.fullscreenEnabled) {
        document.body?.requestFullscreen();
      }
    }
    setFull(!full);
  }, [full]);

  const content = (
    <div>
     <Calendar fullscreen={false} onPanelChange={onPanelChange} />
    </div>
  );

  return (
    <Anchor>
      <Header className="site-layout-background" style={{ padding: 0 }}>
        <div style={{ paddingLeft: "82vw" }}>
        {full ?( <FullscreenExitOutlined onClick={changeFull} style={{ fontSize: "20px",paddingRight:"10px" }}/>):(<FullscreenOutlined onClick={changeFull} style={{ fontSize: "20px",paddingRight:"10px" }}/>)}  
       
          <Popover content={content} title="Calendar">
            <CalendarOutlined style={{ fontSize: "20px" }} />
          </Popover>
        </div>

        {/* {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => {this.setState({
              collapsed:!this.state.collapsed
            })},
          })} */}
      </Header>
    </Anchor>
  );
}
