import React, { useState, useEffect } from 'react';
import '../scss/components/Header.scss';
import logo from '../logo.png';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='Header'>
      <div style={{ width: '76%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <img className='logo' style={{ width: '110px', height: '100px', marginRight: '40px' }} alt='' src={logo} />
        <div className={`navbar ${isOpen ? 'open' : ''}`}>
          {/* {isMobileView && (
            <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>☰</div>
          )}
          <a href="/about">Về chúng tôi</a>
          <div className="dropdown">
            <button className="dropbtn" style={{cursor:'pointer'}}>Nội dung</button>
            <div className="dropdown-content">
              <a href="/dao-duc-trong-kinh-doanh">Đạo đức trong kinh doanh</a>
              <a href="/tinh-huong-kho-xu-ve-dao-duc">Tình huống khó xử về đạo đức</a>
              <a href="/cau-chuyen-thuc-te">Câu chuyện  thực tế</a>
            </div>
          </div>
          <a href="/quiz">Câu hỏi trắc nghiệm</a>
          <a href="/quizkahoot">Kahoot Quiz</a>
          <a href="/ranking">Bảng xếp hạng</a> */}

        </div>
      </div>
    </div>
  );
};

export default Header;
