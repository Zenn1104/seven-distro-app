import { useState, useRef } from "react";
import { useForm, usePage } from "@inertiajs/react";
import { Dialog, Transition, Menu } from "@headlessui/react";
import { CameraIcon, PhotoIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { User } from "@/types";
import PrimaryButton from "@/Components/PrimaryButton";

export default function UpdateProfilePictureForm() {
    const user: User = usePage().props.auth.user;
    const [preview, setPreview] = useState(
        user.profile_picture
            ? `/storage/${user.profile_picture}`
            : "/storage/images/no-image.jpg"
    );
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const { post, setData, processing } = useForm({
        profile_picture: null as File | null,
        _method: "PUT",
    });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.[0]) {
            setData("profile_picture", event.target.files[0]);
            setPreview(URL.createObjectURL(event.target.files[0]));
            setIsOpen(true);
        }
    };

    const handleSubmit = () => {
        post(route("avatar.update"), {
            onSuccess: () => setIsOpen(false),
        });
    };

    return (
        <div className="relative w-32 h-32 mx-auto">
            {/* Avatar */}
            <div className="w-32 h-32 rounded-full border-4 border-gray-300 overflow-hidden shadow-lg">
                <img
                    src={preview}
                    alt="Profile"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Button + Dropdown */}
            <Menu as="div" className="absolute bottom-0 right-0">
                <Menu.Button className="bg-teal-500 text-white p-2 rounded-full shadow-md hover:bg-teal-600">
                    <PlusIcon className="w-6 h-6" />
                </Menu.Button>

                <Transition
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 w-40 mt-2 bg-white border rounded-md shadow-lg">
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    className={`flex items-center w-full px-4 py-2 text-sm ${
                                        active ? "bg-gray-100" : ""
                                    }`}
                                    onClick={() =>
                                        fileInputRef.current?.click()
                                    }
                                >
                                    <PhotoIcon className="w-5 h-5 mr-2" />
                                    Pilih dari Galeri
                                </button>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    className={`flex items-center w-full px-4 py-2 text-sm ${
                                        active ? "bg-gray-100" : ""
                                    }`}
                                    onClick={() =>
                                        fileInputRef.current?.click()
                                    }
                                >
                                    <CameraIcon className="w-5 h-5 mr-2" />
                                    Ambil Foto
                                </button>
                            )}
                        </Menu.Item>
                    </Menu.Items>
                </Transition>
            </Menu>

            {/* Hidden File Input */}
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
            />

            {/* Modal Konfirmasi */}
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-10"
                    onClose={() => setIsOpen(false)}
                >
                    <div className="fixed inset-0 bg-black bg-opacity-30" />

                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <Dialog.Panel className="w-full max-w-md bg-white rounded-lg p-6 shadow-xl">
                            <Dialog.Title className="text-lg font-semibold">
                                Konfirmasi Perubahan
                            </Dialog.Title>
                            <p className="mt-2 text-sm text-gray-600">
                                Apakah Anda yakin ingin mengubah foto profil?
                            </p>

                            <div className="mt-4 flex justify-end gap-2">
                                <PrimaryButton
                                    onClick={() => setIsOpen(false)}
                                    variant="outline"
                                >
                                    Batal
                                </PrimaryButton>
                                <PrimaryButton
                                    onClick={handleSubmit}
                                    disabled={processing}
                                    variant="primary"
                                >
                                    {processing ? "Mengunggah..." : "Simpan"}
                                </PrimaryButton>
                            </div>
                        </Dialog.Panel>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
}
