import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { AimOutlined, CheckCircleFilled, ClockCircleFilled, ExclamationCircleFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
function Home({}) {
    const navigate = useNavigate();
    const [sheetData, setSheetData] = useState([]);

    const statusList = [
        { text: "Sẵn sàng kiểm tra", color: "#3B82F6", icon: null },
        { text: "Đã hoàn thành", color: "#22C55E", icon: <CheckCircleFilled /> },
        { text: "Đang thi công", color: "#F59E0B", icon: <ClockCircleFilled /> },
        { text: "Chưa kiểm tra", color: "#EF4444", icon: <ExclamationCircleFilled /> },
    ];

    useEffect(() => {
        loadCloudData();
    }, []);

    const loadCloudData = async () => {
        const sheetId = "1mG1DPw_01A3jxognu-wUs3tAlGMzuHR2wkftkoloN_w";
        const apiKey = "AIzaSyCmL1B_6Lv3wu7OtUjVyLx3CufpckGZnW4";
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1?key=${apiKey}`;
        const res = await axios.get(url);
        setSheetData(res.data.values);
        console.log("sheetData", res.data.values)
    };


    const handleAddNew = () => {
        const row = Array.from({ length: 40 }, (_, index) =>
            index === 0 ? String(sheetData.length) : ""
        );
        navigate("/construction", {
            state: {
                row,
            },
        });
    };
    return (
        <>
            {/* Header */}

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 20,
                    alignItems: "center",
                }}
            >
                <img src="https://www.phanvu.vn/Data/Sites/1/media/logo-web4.png" style={{ height: 45 }} />

                <select
                    style={{
                        borderRadius: 8,
                        padding: "8px 12px",
                    }}
                >
                    <option>Dự án A</option>
                </select>
            </div>

            {/* Grid */}

            <div
                style={{
                    background: "#fff",
                    borderRadius: 18,
                    padding: 20,
                    display: "grid",
                    gridTemplateColumns: "repeat(3,1fr)",
                    gap: 18,
                }}
            >
                <div
                    onClick={() => handleAddNew()}
                    style={{
                        cursor: "pointer",
                        borderRadius: 16,
                        background: "#F8FAFC",
                        border: "2px dashed #91Caff",
                        padding: 18,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: 180,
                        transition: ".25s",
                    }}
                >
                    <div
                        style={{
                            width: 56,
                            height: 56,
                            borderRadius: "50%",
                            background: "#E6F4FF",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "#1677FF",
                            fontSize: 30,
                            fontWeight: "bold",
                        }}
                    >
                        +
                    </div>

                    <div
                        style={{
                            marginTop: 16,
                            fontWeight: 600,
                            color: "#1677FF",
                            fontSize: 16,
                        }}
                    >
                        Thêm tim cọc
                    </div>
                </div>
                {sheetData.slice(1).map((row, index) => {
                    const status = statusList[index % statusList.length];

                    return (
                        <div
                            key={index}
                            onClick={() =>
                                navigate("/construction", {
                                    state: {
                                        row,
                                    },
                                })
                            }
                            style={{
                                cursor: "pointer",
                                borderRadius: 16,
                                background: "#fff",
                                boxShadow: "0 4px 12px rgba(0,0,0,.08)",
                                padding: 18,
                                position: "relative",
                            }}
                        >
                            {status.icon && (
                                <div
                                    style={{
                                        position: "absolute",
                                        right: 12,
                                        top: 12,
                                        color: status.color,
                                    }}
                                >
                                    {status.icon}
                                </div>
                            )}

                            <div
                                style={{
                                    width: 52,
                                    height: 52,
                                    margin: "auto",
                                    borderRadius: "50%",
                                    background: "#EEF4FF",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <AimOutlined
                                    style={{
                                        color: "#2957FF",
                                        fontSize: 24,
                                    }}
                                />
                            </div>

                            <div
                                style={{
                                    marginTop: 10,
                                    textAlign: "center",
                                    fontSize: 12,
                                }}
                            >
                                {dayjs(row[5]).format("DD/MM/YYYY")}
                            </div>

                            <div
                                style={{
                                    marginTop: 6,
                                    textAlign: "center",
                                    fontWeight: "bold",
                                }}
                            >
                                TIM CỌC
                            </div>

                            <div
                                style={{
                                    fontSize: 22,
                                    textAlign: "center",
                                    color: "#2957FF",
                                    fontWeight: "bold",
                                }}
                            >
                                {row[3]}
                            </div>

                            <div
                                style={{
                                    marginTop: 15,
                                    background: `${status.color}15`,
                                    color: status.color,
                                    borderRadius: 20,
                                    textAlign: "center",
                                    padding: 6,
                                    fontSize: 12,
                                }}
                            >
                                ● {status.text}
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default Home;
