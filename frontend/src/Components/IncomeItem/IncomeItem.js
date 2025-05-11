import React from "react";
import styled from "styled-components";
import { dateFormat } from "../../utils/dateFormat";
import { calender, comment, trash, folder } from "../../utils/Icons";
import Button from "../Button/Button";

function IncomeItem({
                        id,
                        title,
                        amount,
                        date,
                        category,
                        description,
                        deleteItem,
                        indicatorColor,
                        type,
                    }) {
    console.log("type", type);

    return (
        <IncomeItemStyled indicator={indicatorColor}>
            <div className="content">
                <h5>{title}</h5>
                <div className="inner-content">
                    <div className="text">
                        <p>₸. {amount}</p>
                        <p>
                            {calender} {dateFormat(date)}
                        </p>
                        <p>
                            {folder} {category}
                        </p>
                        <p>
                            {comment} {description}
                        </p>
                    </div>
                    <div className="btn-con">
                        <Button
                            icon={trash}
                            bPad={"1rem"}
                            bRad={"50%"}
                            bg={"var(--primary-color"}
                            color={"#fff"}
                            iColor={"#fff"}
                            hColor={"var(--color-green)"}
                            onClick={() => deleteItem(id)}
                        />
                    </div>
                </div>
            </div>
        </IncomeItemStyled>
    );
}

const IncomeItemStyled = styled.div`
    background: #fcf6f9;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 10px;
    padding: 1rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    color: #222260;

    .content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
        h5 {
            font-size: 1.3rem;
            padding-left: 2rem;
            position: relative;
            &::before {
                content: "";
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                width: 0.8rem;
                height: 0.8rem;
                border-radius: 50%;
                background: ${(props) => props.indicator};
            }
        }

        .inner-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .text {
                display: flex;
                align-items: center;
                gap: 1.5rem;
                p {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--primary-color);
                    opacity: 0.8;
                }
            }
        }
    }
`;

export default IncomeItem;
