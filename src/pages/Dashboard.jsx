import React, { useState, useEffect } from 'react';
import StatCard from '../components/common/StatCard';
import {
    FaUsers,
    FaDoorOpen,
    FaUserSlash,
    FaKey,
    FaExclamationCircle
} from 'react-icons/fa';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from 'recharts';
import { rapportService } from '../services/rapportService';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Dashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await rapportService.getDashboard();
                setData(response.data);
            } catch (error) {
                console.error("Erreur stats dashboard", error);
                // Fallback mock data if API fails for demo
                setData({
                    stats: {
                        tauxOccupation: 78,
                        chambresDispo: 412,
                        etudiantsSuspendus: 23,
                        clesNonDeposees: 45
                    },
                    repartitionSexe: [
                        { name: 'Garçons', value: 1240 },
                        { name: 'Filles', value: 616 }
                    ],
                    occupationBatiments: [
                        { name: 'A', taux: 85 },
                        { name: 'B', taux: 72 },
                        { name: 'C', taux: 90 },
                        { name: 'D', taux: 65 },
                        { name: 'E', taux: 80 },
                        { name: 'F', taux: 75 },
                        { name: 'G', taux: 95 },
                    ],
                    alertes: [
                        { id: 1, type: 'suspension', message: '5 étudiants suspendus aujourd\'hui', time: 'il y a 2h' },
                        { id: 2, type: 'reparation', message: '3 chambres en réparation (Bât. G)', time: 'il y a 5h' },
                        { id: 3, type: 'deadline', message: 'Date limite dépôt clés : 15/06/2025', time: 'Important' }
                    ]
                });
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) return <LoadingSpinner fullscreen />;

    const COLORS = ['#1E3A5F', '#4A90D9', '#10B981', '#F59E0B'];

    return (
        <div className="space-y-8">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Taux d'occupation global"
                    value={`${data.stats.tauxOccupation}%`}
                    icon={FaUsers}
                    color="primary"
                    trend={{ value: 4.5, positive: true }}
                />
                <StatCard
                    title="Chambres disponibles"
                    value={data.stats.chambresDispo}
                    icon={FaDoorOpen}
                    color="success"
                />
                <StatCard
                    title="Étudiants suspendus"
                    value={data.stats.etudiantsSuspendus}
                    icon={FaUserSlash}
                    color="danger"
                />
                <StatCard
                    title="Clés non déposées"
                    value={data.stats.clesNonDeposees}
                    icon={FaKey}
                    color="warning"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Occupancy Chart */}
                <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-50">
                    <h3 className="text-lg font-bold text-text-primary mb-6">Taux d'occupation par bâtiment</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data.occupationBatiments}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} unit="%" />
                                <Tooltip
                                    cursor={{ fill: '#F9FAFB' }}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                />
                                <Bar dataKey="taux" fill="#1E3A5F" radius={[6, 6, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Gender Distribution Chart */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-50">
                    <h3 className="text-lg font-bold text-text-primary mb-6">Répartition par sexe</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data.repartitionSexe}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {data.repartitionSexe.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-4 flex justify-between text-sm">
                        {data.repartitionSexe.map((item, idx) => (
                            <div key={idx} className="text-center">
                                <p className="text-text-secondary">{item.name}</p>
                                <p className="font-bold text-text-primary">{item.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Alerts */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-50 overflow-hidden">
                <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-text-primary flex items-center">
                        <FaExclamationCircle className="text-danger mr-3" /> ALERTES RÉCENTES
                    </h3>
                    <button className="text-sm font-semibold text-primary hover:text-accent transition-preset">Tout voir</button>
                </div>
                <div className="divide-y divide-gray-50">
                    {data.alertes.map((alerte) => (
                        <div key={alerte.id} className="p-6 flex items-start space-x-4 hover:bg-gray-50 transition-preset">
                            <div className={`mt-1 h-2 w-2 rounded-full ${alerte.type === 'suspension' ? 'bg-danger' : alerte.type === 'reparation' ? 'bg-warning' : 'bg-info'}`}></div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-text-primary">{alerte.message}</p>
                                <p className="text-xs text-text-secondary mt-1">{alerte.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
