import { useForm } from "@inertiajs/react";
import { FormEvent } from "react";
import { Head } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";

export default function CompleteProfile() {
    const { data, setData, post, processing, errors } = useForm({
        phone: "",
        address: "",
        city: "",
        state: "",
        postal_code: "",
        country: "",
        profile_picture: null as File | null,
        _method: "PUT",
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post("/profile/complete");
    };

    return (
        <Authenticated>
            <div className="max-w-2xl mx-auto p-6 mt-24 bg-white rounded-md shadow-xl">
                <Head title="Completed Profile" />
                <h2 className="text-xl font-semibold mb-4">Lengkapi Profil</h2>
                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="block">Nomor Telepon</label>
                        <input
                            type="text"
                            value={data.phone}
                            onChange={(e) => setData("phone", e.target.value)}
                            className="w-full border p-2"
                        />
                        {errors.phone && (
                            <div className="text-red-500">{errors.phone}</div>
                        )}
                    </div>

                    <div>
                        <label className="block">Alamat</label>
                        <textarea
                            value={data.address}
                            onChange={(e) => setData("address", e.target.value)}
                            className="w-full border p-2"
                        ></textarea>
                        {errors.address && (
                            <div className="text-red-500">{errors.address}</div>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block">Kota</label>
                            <input
                                type="text"
                                value={data.city}
                                onChange={(e) =>
                                    setData("city", e.target.value)
                                }
                                className="w-full border p-2"
                            />
                            {errors.city && (
                                <div className="text-red-500">
                                    {errors.city}
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="block">Provinsi</label>
                            <input
                                type="text"
                                value={data.state}
                                onChange={(e) =>
                                    setData("state", e.target.value)
                                }
                                className="w-full border p-2"
                            />
                            {errors.state && (
                                <div className="text-red-500">
                                    {errors.state}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block">Kode Pos</label>
                            <input
                                type="text"
                                value={data.postal_code}
                                onChange={(e) =>
                                    setData("postal_code", e.target.value)
                                }
                                className="w-full border p-2"
                            />
                            {errors.postal_code && (
                                <div className="text-red-500">
                                    {errors.postal_code}
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="block">Negara</label>
                            <input
                                type="text"
                                value={data.country}
                                onChange={(e) =>
                                    setData("country", e.target.value)
                                }
                                className="w-full border p-2"
                            />
                            {errors.country && (
                                <div className="text-red-500">
                                    {errors.country}
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block">Foto Profil</label>
                        <input
                            type="file"
                            onChange={(e) =>
                                setData(
                                    "profile_picture",
                                    e.target.files?.[0] || null
                                )
                            }
                            className="w-full border p-2"
                        />
                    </div>

                    <PrimaryButton
                        type="submit"
                        variant="primary"
                        disabled={processing}
                    >
                        Simpan
                    </PrimaryButton>
                </form>
            </div>
        </Authenticated>
    );
}
