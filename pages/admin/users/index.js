import React from "react";
import LayoutAdmin from "../../../components/LayoutAdmin";
import { useState, useEffect } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
  Switch,
  Textarea,
  FormLabel,
  FormControl,
  Flex,
  Select,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import Link from "next/link";
import { AiFillCaretDown, AiOutlineUser } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import CloudinaryService from "../../../service/CloudinaryService";
import { useSession } from "next-auth/react";
export default function Index({ users, roles }) {
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [trangThai, setTrangThai] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [fullname, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const [roleSelect, setRoleSelect] = useState([]);
  const [images, setImages] = useState([]);

  const [nguoiDung, setNguoiDung] = useState(users.data);

 
  const [input, setInput] = useState("");
  const session = useSession();

  const handleSort = () => {
    const filteredData = nguoiDung.sort((a, b) =>
      a.fullname.localeCompare(b.fullname)
    );
    setNguoiDung(filteredData);
  };

  const them = async () => {
    const anhCanUpload = images[0];
    const response = await CloudinaryService.upload(anhCanUpload);

    const usernho = {
      createDate: new Date(),
      name: name,
      status: true,
      email: email,
      fullname: fullname,
      image: response.url,
      password: password,
      phonenumber: phonenumber,
      roles: roleSelect,
    };

    const URL = "http://localhost:8080/api/users/add";
    const options = {
      method: "POST",
      body: JSON.stringify(usernho),
      headers: {
        "Content-type": "application/json",
      },
    };
    await fetch(URL, options);

    onClose();
    xulyload();
  };

  const xulyload = async () => {
    const URL = "http://localhost:8080/api/users";
    const datauser = await fetch(URL);
    const datauserjson = await datauser.json();
    setNguoiDung(datauserjson.data);
  };

  useEffect(() => {
    const goiApi = async () => {
      try {
        const user_nguoiDung = users.data.filter((nguoiDung_user) => {
          const monanMacDinh = nguoiDung_user.fullname;
          const monanVietHoa = monanMacDinh.toUpperCase();
          const inputMacDinh = input.trim();
          const inputVietHoa = inputMacDinh.toUpperCase();

          return monanVietHoa.includes(inputVietHoa);
        });

        setNguoiDung(user_nguoiDung);
      } catch (error) {
       
      }
    };
    goiApi();
  }, [input]);

  const handleUpdateStatus = async (id) => {
    const URL = `http://localhost:8080/api/users/status/${id}`;
    const response = await fetch(URL, { method: "PUT" });
    xulyload();
  };
  return (
    <LayoutAdmin>
      <div className=" flex flex-col gap-2">
        <div className="flex items-center justify-between px-[15px] mt-[30px]">
          <div className="font-medium text-[20px]">Users</div>
          <Button
            bg="blue.400"
            color="white"
            _hover={{ bg: "blue.400" }}
            onClick={() => {
              onOpen()
            }}
          >
            Thêm users
          </Button>
        </div>
        <Modal isOpen={isOpen} onClose={onClose} size="4xl">
          <ModalOverlay />
          <ModalContent height={550}>
            <ModalHeader>Thêm user</ModalHeader>
            <ModalCloseButton />
            <ModalBody className="grid grid-cols-2 gap-4">
              <div>
                <FormLabel>Fullname user</FormLabel>
                <Input
                  value={fullname}
                  onChange={(e) => {
                    setFullName(e.target.value);
                  }}
                  placeholder="fullname user"
                />
              </div>
              <div>
                <FormLabel>Email user</FormLabel>
                <Input
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="Email user"
                />
              </div>

              <div>
                <FormLabel>Số điện thoại user</FormLabel>
                <Input
                  value={phonenumber}
                  onChange={(e) => {
                    setPhonenumber(e.target.value);
                  }}
                  placeholder="Số điện thoại user"
                />
              </div>

              <div>
                <FormLabel>Password user</FormLabel>
                <Input
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder="Password user"
                />
              </div>
              <div>
                <FormLabel>Chọn roles</FormLabel>
                <div className="mb-[10px] flex flex-wrap gap-2 ">
                  {roleSelect.map((role, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => {
                          const ketQua = roleSelect.filter((item) => {
                            return item.id != role.id;
                          });
                          setRoleSelect(ketQua);
                        }}
                        className="bg-green-300 px-5 py-1 rounded"
                      >
                        {role.description}
                      </div>
                    );
                  })}
                </div>
                <Select
                  value={role}
                  onChange={(e) => {
                    const categoryObject = JSON.parse(e.target.value);
                    setRole(e.target.value);

                    const locKhongTrung = roleSelect.filter(
                      (role) => role.id != categoryObject.id
                    );
                    setRoleSelect([...locKhongTrung, categoryObject]);
                  }}
                  placeholder="Chọn danh mục"
                >
                  {roles.data.map((role) => {
                    return (
                      <option key={role.id} value={JSON.stringify(role)}>
                        {role.description}
                      </option>
                    );
                  })}
                </Select>
              </div>
              <div>
                <FormLabel>Ảnh user</FormLabel>
                <div className="flex gap-1 flex-wrap">
                  <label
                    htmlFor="inputanh"
                    className="h-24 w-24 border rounded flex items-center justify-center cursor-pointer select-none"
                  >
                    <span className="text-[30px]">+</span>
                  </label>
                  {images.map((image, key) => {
                    const url = URL.createObjectURL(image);

                    return (
                      <div
                        className="h-24 w-24 border rounded relative"
                        key={key}
                      >
                        <img
                          className="bg-white w-full h-full object-cover rounded "
                          src={url}
                          alt={key}
                        />
                        <div
                          onClick={() => {
                            const ketQua = images.filter((item) => {
                              return item.name != image.name;
                            });
                            setImages(ketQua);
                          }}
                          className="absolute top-1 right-1"
                        >
                          X
                        </div>
                      </div>
                    );
                  })}
                </div>

                <Input
                  multiple
                  id="inputanh"
                  className="hidden"
                  onChange={(e) => {
                    const files = e.target.files;
                    setImages(Array.from(files));
                  }}
                  type="file"
                  placeholder="Image"
                />
              </div>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Đóng
              </Button>
              <Button onClick={them} variant="ghost">
                Lưu
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <div className="px-[15px]">
          <div className=" border bg-gray-50 flex flex-col gap-6 py-8 px-2 mt-[20px] rounded-[8px]">
            <div className="flex gap-10 ">
              <div
                onClick={() => {
                  setTrangThai(null);
                }}
                className={`${
                  trangThai === null ? "border-b-4 border-green-800" : ""
                } text-[14px] pb-3 `}
              >
                Tất cả
              </div>
              <div
                onClick={() => {
                  setTrangThai(true);
                }}
                className={`${
                  trangThai ? "border-b-4 border-green-800" : ""
                } text-[14px] pb-3 `}
              >
                Đang hoạt động
              </div>
              <div
                onClick={() => {
                  setTrangThai(false);
                }}
                className={`${
                  trangThai === false ? "border-b-4 border-green-800" : ""
                } text-[14px] pb-3 `}
              >
                Ngừng hoạt động
              </div>
            </div>
            <div className="relative flex w-full items-center gap-[20px]">
              <input
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
                className="flex-1 pl-[30px] h-[35px] text-[14px] font-medium rounded border border-gray-300"
                placeholder="Lọc sản phẩm...."
              ></input>
              <BsSearch className="absolute pl-2 top-2 text-[20px] "></BsSearch>
              <div className="flex gap-[10px]">
                <div className="flex divide-x bg-white rounded border border-gray-400 px-[40px]">
                  {session?.data?.user ? (
                    <Menu size="sm">
                      <MenuButton>
                        <div className="flex gap-1 items-center h-[35px]">
                          <div className="flex gap-1 items-center">
                            <div className="text-[13px] font-medium">
                              Sắp xếp
                            </div>
                            <AiFillCaretDown className="text-[13px]"></AiFillCaretDown>
                          </div>
                        </div>
                      </MenuButton>
                      <MenuList>
                        <MenuItem className="text-sm">
                          <Link
                            onClick={() => {
                              handleSort();
                            }}
                            href=""
                          >
                            Sắp xếp theo tên
                          </Link>
                        </MenuItem>

                        <MenuItem className="text-sm">
                          <Link href="">Sắp xếp theo ngày</Link>
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  ) : (
                    <div>
                      <AiOutlineUser></AiOutlineUser>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <TableContainer>
              <Table className="bg-gray-50">
                <Thead>
                  <Tr>
                    <Th>Id User </Th>
                    <Th>Ảnh User</Th>
                    <Th>Tên User</Th>
                    <Th>Email User</Th>
                    <Th>Trạng thái</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {nguoiDung.map((user, index) => {
                    const dieuKien =
                      trangThai === null || user.status == trangThai;

                    return (
                      dieuKien && (
                        <Tr key={index}>
                          <Td>
                            <div>
                              <div>{user.id}</div>
                            </div>
                          </Td>
                          <Td>
                            <img
                              className="w-12 h-12 rounded"
                              src={user.image}
                            ></img>
                          </Td>
                          <Td>
                            <Link href={`/admin/users/${user.id}`}>
                              {user.fullname}
                            </Link>
                          </Td>
                          <Td>{user.email}</Td>
                          <Td>
                            <div
                              onClick={() => {
                                handleUpdateStatus(user.id);
                              }}
                            >
                              <Switch isChecked={user.status} />
                            </div>
                          </Td>
                        </Tr>
                      )
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
}
export const getServerSideProps = async () => {
  const URL = "http://localhost:8080/api/users";
  const datausers = await fetch(URL);
  const usersdata = await datausers.json();

  const URL_role = "http://localhost:8080/api/roles";
  const dataRoles = await fetch(URL_role);
  const roledata = await dataRoles.json();

  return {
    props: {
      users: usersdata,
      roles: roledata,
    },
  };
};
