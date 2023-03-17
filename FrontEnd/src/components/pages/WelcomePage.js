import React, { useEffect } from "react";
import welcomePageCover from "../../images/welcomepage/welcomePageCover.jpg";
import "../../css/welcomePage.css";
import { useHistory } from "react-router";
import shoppingCart from "../../images/welcomepage/shoppingCart.gif";
import searchTopic from "../../images/welcomepage/searchTopic.jpg";
import sell from "../../images/welcomepage/sell.jpg";
import comment from "../../images/welcomepage/comment.jpg";
import stock from "../../images/welcomepage/stock.jpg";

const WelcomePage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return () => {};
  }, []);
  const history = useHistory();
  const goShop = () => {
    history.push("/shop");
  };

  return (
    <div className="welcomePageContainer">
      <div>
        <div className="welcomeHeader" onClick={goShop}>
          welcome to Squid NEXT
        </div>
        <div className="startButtonContainer">
          <div className="startButton" onClick={goShop}>
            START
          </div>
        </div>
        <img
          src={welcomePageCover}
          className="welcomeCover"
          alt="welcomeCover"
        />
      </div>

      <div className="allWelcomeTopicContainer">
        <div className="welcomeTopicContainer">
          <img src={shoppingCart} className="imageTopic" alt="topic1" />{" "}
          <div className="contentTopic">
            <div className="headerTopic">เว็บไซต์นี้คือเว็บไซต์อะไร ?</div>
            <div style={{ maxWidth: "650px" }}>
              เป็นเว็บไซต์สำหรับซื้อขายสินค้าของเล่นหรือสินค้าเกี่ยวกับการ์ตูน
              สำหรับทุกคน ไม่ว่าคุณจะสนใจเรื่องการขายสินค้าที่คุณมี
              หรือการซื้อสินค้าจากผู้อื่นพวกเราก็มีบริการรองรับสำหรับทุกคน
              ถ้าคุณสนใจแล้วก็อย่ารอช้า กดปุ่ม Start แล้วไปลุยกันเลย!~
            </div>
          </div>
        </div>

        <div className="f28 b pl-25 pb-20 pt-80">Feature หลักของเว็บไซต์</div>
        <div className="optionTopic">
          <div>
            <img src={searchTopic} alt="searchWelcome" />
            <div className="headerTopic"> การค้นหาสินค้า</div>
            คุณสามารถค้นหาสินค้าที่ต้องการผ่านช่องทางต่างๆในการค้นหา
            ซึ่งจะช่วยให้คุณเจอสินค้าที่ต้องการได้ง่ายขึ้น
          </div>

          <div>
            <img src={comment} alt="searchWelcome" />
            <div className="headerTopic"> การแสดงความคิดเห็นต่อสินค้า</div>
            คุณสามารถแสดงความเห็นต่อสินค้าที่คุณได้ซื้อ
            เพื่อแนะนำผู้อื่นที่จะสนใจสินค้านั้นเหมือนกัน
            และคุณยังสามารถอ่านความเห็นของผู้อื่นเพื่อช่วยให้การตัดสินใจในการซื้อของคุณง่ายขึ้นด้วย
          </div>

          <div>
            <img src={sell} alt="searchWelcome" />
            <div className="headerTopic"> การขายสินค้ากับเรา</div>
            ทุกคนสามารถมาขายสินค้ากับเราได้ ถ้าหากคุณสนใจจะขายสินค้ากับเรา
            สามารถสมัครบัญชีและขอเป็นผู้ขายบนเว็บไซต์ของเราได้เลย
          </div>

          <div>
            <img src={stock} alt="searchWelcome" />
            <div className="headerTopic"> ตรวจสอบสินค้าของคุณ</div>
            เมื่อคุณเป็นผู้ขายกับเราแล้ว
            จะสามารถตรวจสอบสินค้าทั้งหมดที่คุณวางขาย
            และสามารถดูประวัติการขายของสินค้าของคุณได้ด้วย
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
