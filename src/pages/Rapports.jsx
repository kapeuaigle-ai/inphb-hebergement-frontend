import React, { useState } from 'react';
import { FaFilePdf, FaFileExcel, FaChartBar, FaUserFriends, FaGlobeAfrica, FaNotesMedical } from 'react-icons/fa';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import { rapportService } from '../services/rapportService';
import { toast } from 'react-toastify';

const Rapports = () => {
    const handleExport = async (type) => {
        try {
            const response = type === 'pdf' ? await rapportService.exportPDF() : await rapportService.exportExcel();
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `rapport_hebergement_${new Date().getFullYear()}.${type}`);
            document.body.appendChild(link);
            link.click();
            toast.success(`Rapport ${type.toUpperCase()} généré avec succès`);
        } catch (error) {
            toast.error("Échec de la génération du rapport");
        }
    };

    const dataOccupation = [
        { name: 'Bât. A', value: 87 }, { name: 'Bât. B', value: 92 }, { name: 'Bât. C', value: 78 },
        { name: 'Bât. D', value: 64 }, { name: 'Bât. E', value: 81 }, { name: 'Bât. F', value: 75 },
        { name: 'Bât. G', value: 95 }, { name: 'Bât. H', value: 88 }
    ];

    const dataRepartition = [
        { name: 'PREPA 1', count: 450, color: '#1E3A5F' },
        { name: 'PREPA 2', count: 420, color: '#2E5077' },
        { name: 'TS 1/2', count: 320, color: '#4A90D9' },
        { name: 'ING 1/2', count: 580, color: '#10B981' },
        { name: 'ING 3', count: 86, color: '#F59E0B' },
    ];

    return (
        <div className="space-y-8 pb-12">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-text-primary">Analyse & Rapports</h2>
                    <p className="text-text-secondary">Visualisez les statistiques globales et exportez les données</p>
                </div>

                <div className="flex space-x-3">
                    <button
                        onClick={() => handleExport('pdf')}
                        className="flex items-center space-x-3 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold shadow-lg shadow-red-100 transition-preset"
                    >
                        <FaFilePdf size={18} />
                        <span>Exporter en PDF</span>
                    </button>
                    <button
                        onClick={() => handleExport('excel')}
                        className="flex items-center space-x-3 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold shadow-lg shadow-green-100 transition-preset"
                    >
                        <FaFileExcel size={18} />
                        <span>Exporter en Excel</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Occupancy rate by building */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-50">
                    <h3 className="text-lg font-bold text-text-primary mb-8 flex items-center">
                        <FaChartBar className="text-primary mr-3" /> TAUX D'OCCUPATION PAR BÂTIMENT
                    </h3>
                    <div className="h-96">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={dataOccupation} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#F3F4F6" />
                                <XAxis type="number" domain={[0, 100]} hide />
                                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#4B5563', fontWeight: '600' }} width={60} />
                                <Tooltip cursor={{ fill: '#F9FAFB' }} contentStyle={{ borderRadius: '12px' }} />
                                <Bar dataKey="value" fill="#1E3A5F" radius={[0, 4, 4, 0]} barSize={24}>
                                    {dataOccupation.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.value > 90 ? '#10B981' : entry.value < 70 ? '#F59E0B' : '#1E3A5F'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Level distribution */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-50">
                    <h3 className="text-lg font-bold text-text-primary mb-8 flex items-center">
                        <FaUserFriends className="text-primary mr-3" /> RÉPARTITION PAR NIVEAU D'ÉTUDE
                    </h3>
                    <div className="space-y-6">
                        <table className="w-full">
                            <thead className="text-[10px] font-black uppercase text-text-secondary border-b border-gray-50">
                                <tr>
                                    <th className="text-left pb-4">Niveau</th>
                                    <th className="text-center pb-4">Nombre</th>
                                    <th className="text-center pb-4">Pourcentage</th>
                                    <th className="text-right pb-4">Visualisation</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {dataRepartition.map((item, idx) => {
                                    const total = dataRepartition.reduce((acc, curr) => acc + curr.count, 0);
                                    const percentage = ((item.count / total) * 100).toFixed(1);
                                    return (
                                        <tr key={idx} className="group">
                                            <td className="py-4 font-bold text-text-primary text-sm">{item.name}</td>
                                            <td className="py-4 text-center font-medium text-text-secondary text-sm">{item.count}</td>
                                            <td className="py-4 text-center text-sm">
                                                <span className="px-2 py-1 bg-blue-50 text-primary rounded-lg font-bold">{percentage}%</span>
                                            </td>
                                            <td className="py-4 text-right min-w-[120px]">
                                                <div className="inline-block w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full rounded-full transition-all duration-1000"
                                                        style={{ width: `${percentage}%`, backgroundColor: item.color }}
                                                    ></div>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Specialty metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-700 to-primary p-8 rounded-3xl text-white shadow-xl">
                    <div className="flex items-center justify-between mb-6">
                        <div className="p-3 bg-white/10 rounded-2xl"><FaGlobeAfrica size={24} /></div>
                        <span className="text-[10px] font-bold tracking-widest bg-white/20 px-3 py-1 rounded-full uppercase">International</span>
                    </div>
                    <h4 className="text-4xl font-black mb-1">128</h4>
                    <p className="text-blue-200 text-sm font-medium">Étudiants internationaux logés</p>
                </div>

                <div className="bg-gradient-to-br from-green-600 to-green-800 p-8 rounded-3xl text-white shadow-xl">
                    <div className="flex items-center justify-between mb-6">
                        <div className="p-3 bg-white/10 rounded-2xl"><FaNotesMedical size={24} /></div>
                        <span className="text-[10px] font-bold tracking-widest bg-white/20 px-3 py-1 rounded-full uppercase">Santé</span>
                    </div>
                    <h4 className="text-4xl font-black mb-1">42</h4>
                    <p className="text-green-100 text-sm font-medium">Priorités médicales / Handicaps</p>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <div className="p-3 bg-orange-50 text-orange-500 rounded-2xl"><FaChartBar size={24} /></div>
                        <span className="text-[10px] font-bold tracking-widest bg-orange-50 text-orange-600 px-3 py-1 rounded-full uppercase">Croissance</span>
                    </div>
                    <h4 className="text-4xl font-black text-text-primary mb-1">+12%</h4>
                    <p className="text-text-secondary text-sm font-medium">Taux de remplissage vs 2024</p>
                </div>
            </div>
        </div>
    );
};

export default Rapports;
