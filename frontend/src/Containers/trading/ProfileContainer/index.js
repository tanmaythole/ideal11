import React from 'react'
import SecondaryHeader from '../../../Components/AppHeader/SecondaryHeader';
import TabFooter from '../../../Components/TabFooter';
import coverImg from '../../../assets/images/coverImg.jpg';
import user from '../../../assets/images/user.png';
import style from './style.module.css';
import ProfilePart from '../../../Components/Profile/ProfilePart';
import StatCard from '../../../Components/Profile/StatCard';
import { FaChartLine, FaListAlt } from 'react-icons/fa';
import InfoBlock from '../../../Components/Profile/InfoBlock';
import Row from '../../../Components/Styles/Row';

const ProfileContainer = () => {
    return (
        <>
            <SecondaryHeader>My profile</SecondaryHeader>
            <div className={style.container}>
                <img
                    src={coverImg}
                    className={style.coverImg} 
                />
                <div className={style.userImg}>
                    <img 
                        src={user}
                        className={style.profileImg}
                    />
                    <h2>User Full Name</h2>
                </div>

                <ProfilePart title='Experience'>
                    <Row>
                        <StatCard>
                            <StatCard.Icon>
                                <FaListAlt
                                    size={35}
                                />
                            </StatCard.Icon>
                            <StatCard.Content>
                                <h3>120</h3>
                                <div>Matches Played</div>
                            </StatCard.Content>
                        </StatCard>
                        <StatCard>
                            <StatCard.Icon>
                                <FaChartLine 
                                    size={35}
                                />
                            </StatCard.Icon>
                            <StatCard.Content>
                                <h3>1200</h3>
                                <div>Winnings</div>
                            </StatCard.Content>
                        </StatCard>
                    </Row>
                </ProfilePart>

                <ProfilePart title='Primary Info'>
                    <Row>
                        <InfoBlock>
                            <InfoBlock.Title>Mobile: </InfoBlock.Title>
                            <InfoBlock.Property>+12345678909</InfoBlock.Property>
                        </InfoBlock>
                        <InfoBlock>
                            <InfoBlock.Title>Mobile: </InfoBlock.Title>
                            <InfoBlock.Property>+12345678909</InfoBlock.Property>
                        </InfoBlock>
                    </Row>
                    <Row>
                        <InfoBlock>
                            <InfoBlock.Title>Mobile: </InfoBlock.Title>
                            <InfoBlock.Property>+12ghj345678909</InfoBlock.Property>
                        </InfoBlock>
                    </Row>
                </ProfilePart>

                <ProfilePart title="Basic Info">
                    
                </ProfilePart>
            </div>
            <TabFooter />
        </>
    )
}

export default ProfileContainer;