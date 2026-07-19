import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
//#region app/page.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var navItems = [
	["关于我", "#about"],
	["我的故事", "#stories"],
	["与我合作", "#together"],
	["此刻", "#now"]
];
function Home() {
	const [qrOpen, setQrOpen] = (0, import_react.useState)(false);
	const [menuOpen, setMenuOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) entry.target.classList.add("is-visible");
			});
		}, { threshold: .12 });
		document.querySelectorAll("[data-reveal]").forEach((node) => observer.observe(node));
		return () => observer.disconnect();
	}, []);
	(0, import_react.useEffect)(() => {
		document.body.style.overflow = qrOpen ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [qrOpen]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "site-header",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					className: "logo",
					href: "#top",
					"aria-label": "返回首页",
					children: ["LUU", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "●" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "menu-button",
					onClick: () => setMenuOpen(!menuOpen),
					"aria-expanded": menuOpen,
					"aria-label": "打开导航",
					children: menuOpen ? "关闭" : "目录"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: menuOpen ? "is-open" : "",
					"aria-label": "网站导航",
					children: navItems.map(([label, href]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href,
						onClick: () => setMenuOpen(false),
						children: label
					}, href))
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "hero",
			id: "top",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hero-visual",
					"aria-hidden": "true",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/images/hero-particle.png",
						alt: ""
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "stars",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hero-copy",
					"data-reveal": true,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "overline",
							children: "A HUMAN SAMPLE IN THE AI ERA"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: [
							"Hello，",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"我是 ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Luu." })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "hero-role",
							children: "IoT 准大三学生 / 学习型内容创作者"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "hero-intro",
							children: "好奇、敏感，愿意不断探索人类体验。"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							className: "explore",
							href: "#about",
							children: ["继续认识我 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "↘" })]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "hero-note",
					children: "在行动中，逐渐成为我。"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "about dusk",
			id: "about",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "about-photo",
				"data-reveal": true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/images/travel.jpg",
					alt: "Luu 独自旅行时拍下的晚霞"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "about-copy",
				"data-reveal": true,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "section-no",
						children: "01 — ABOUT"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
						"我的起步不算早，",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"但我正在慢慢",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "发芽。" })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "从大学开始，我才真正走进一场关于自我探索的冒险。组织辩论队、排小组情景剧、争取各种演讲机会，也喜欢尝试不同的活动，收集更多元的人类样本。" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "我是 Luu—叶蕊睿，一个准大三的 IoT 学生，也是一名学习型内容创作者。此刻的我，正在借助 AI 快速迭代、持续输出，也在寻找更适合自己的表达方式。" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "identity-tags",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "INFP · 小小切片" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "理想主义" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "持续探索" })
						]
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "stories paper",
			id: "stories",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "section-heading",
					"data-reveal": true,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "section-no",
							children: "02 — HOW I BECAME ME"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
							"三种与自己、他人和世界",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"建立链接的方式。"
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "一份关于“Luu 如何通过行动，逐渐成为 Luu”的观察记录。" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "story story-travel",
					"data-reveal": true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "story-image",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/images/travel.jpg",
							alt: "独自旅行途中拍下的天空与晚霞"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "story-copy",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "story-index",
								children: "01 / TRAVEL"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "独自旅行" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "lead",
								children: "真正作为一个“我”，去探索与发现。"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "从熟悉的环境里走出去，我开始真正打开对世界的好奇。独自观察、行走，偶尔迷路，也在更大的世界里重新认识自己。它让我感受到：我既在靠近世界，也在慢慢靠近自己。" })
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "story story-painting",
					"data-reveal": true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "story-copy",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "story-index",
								children: "02 / PAINTING"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "绘画" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "lead",
								children: "通过画笔，创造一个属于自己的世界。"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "画画让我感受到自己的创作欲正在被唤醒。那些还没有被语言说清的感受、想象和审美，可以一点点落到画面里。创作的过程，也是我与自己安静相处的方式。" })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "story-image painting-image",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/images/painting.jpg",
							alt: "Luu 的绘画作品"
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "story story-speaking",
					"data-reveal": true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "story-image speech-image",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/images/speech.jpg",
							alt: "Luu 站在舞台上进行公众演讲"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "story-copy",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "story-index",
								children: "03 / PUBLIC SPEAKING"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "公众演讲" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "lead",
								children: "我没有等到不害怕，才走上舞台。"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "我曾经是一个面对公众演讲会紧张、畏惧的小女孩。后来一次次 push 自己上台，发现紧张和激动原来可以同时存在。再后来，我竟然开始享受站在舞台上，与大家产生链接的感觉。" })
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "side-quests",
					"data-reveal": true,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "沿途脚印 01" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: "组织辩论队" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "主动走进观点碰撞的现场，也练习倾听不同的声音。" })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "沿途脚印 02" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: "小组情景剧" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "尝试不同的表达方式，继续收集多样的人类体验。" })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "青年营 · 教练寄语" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "“你能看见每一个人，看见他们的所思所想，去发挥你的能力，释放你的能量！”" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "在这里，我认识来自不同地方的人，听见许多人生故事，也更深地感受到真诚链接的珍贵。" })
						] })
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "work paper",
			id: "work",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "work-intro",
				"data-reveal": true,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "section-no",
						children: "03 — VISUAL EXPLORATION"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
						"第一次把想象，",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"放进一个真实项目。"
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "GGJ 48 小时游戏开发，是我第一次以美术设计的角色参与项目。我完成了游戏相关视觉呈现，也第一次在限时协作里，看见审美如何与产品需求相遇。" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "它并不证明我的视觉技能已经成熟。相反，它让我更清楚地看见：自己还需要练习用户视角的转换，以及对游戏核心的整体把握。我希望继续收集真实反馈，让视觉审美与产品需求更好地融合。" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "work-label",
						children: "《狐面心渊》 · GGJ 2026"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "art-collage",
				"data-reveal": true,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
						className: "art art-a",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/images/ggj-background.png",
							alt: "《狐面心渊》镜像之渊关卡背景设计"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", { children: "镜像之渊 · 关卡背景" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
						className: "art art-b",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/images/ggj-logo.png",
							alt: "《狐面心渊》Logo 设计"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", { children: "水墨与狐面 · Logo" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
						className: "art art-c",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/images/ggj-dual.png",
							alt: "《狐面心渊》狐灵对视画面"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", { children: "狐灵 · 对视" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
						className: "art art-d",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/images/ggj-ice.png",
							alt: "《狐面心渊》狐灵冰蓝形态"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", { children: "狐灵 · 冰蓝形态" })]
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "together paper",
			id: "together",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "section-heading compact",
					"data-reveal": true,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "section-no",
							children: "04 — WORK WITH ME"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
							"怎样和我一起，",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"把事情做好？"
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "我愿意认真听见伙伴的想法，也希望我们能在清晰、真诚的沟通中一起向前。" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "collab-grid",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "collab-card dark-card",
							"data-reveal": true,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "我可以带来的" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "创作，也包括看见人。" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "视觉物料、内容创作与策划、用户洞察、体验设计、活动策划、信息整合与提炼，以及在合适的时候为伙伴提供倾听、梳理和情绪支持。" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "我比较擅长为自己有理解、有感受的主题寻找视觉化表达，也仍在练习如何从个人表达切换到用户视角。" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "collab-card",
							"data-reveal": true,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "开始之前" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "清楚一点，我会更快启动。" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "如果可以，请告诉我：为谁做 / 想解决什么 / 最终交付物 / 截止时间 / 参考案例 / 对接人 / 谁做最终判断。" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "collab-card warm-card",
							"data-reveal": true,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "什么会点亮我" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "意义感、反馈与人的链接。" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "当一件事有真实反馈、能让创意充分运用，也保留一点成长空间和挑战，我会更愿意投入其中。" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "collab-card",
							"data-reveal": true,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "沟通与进度" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "关键节点同步，中间留给我思考。" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "遇到问题时，我会先尝试解决，再带着遗留问题、已有尝试、初版思路和需要的资源来沟通。" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "collab-card",
							"data-reveal": true,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "反馈给我" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "真诚、具体，也带着尊重。" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "告诉我具体亮点、相比之前的成长，也请指出问题在哪里、为什么不合适，以及可以怎样调整。比起评判，我更需要可以继续行动的方向。" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "collab-card support-card",
							"data-reveal": true,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "压力来临时" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "陪伴与在场，已经非常足够。" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "压力大时，我可能会紧张、信息过载、拖延或变得安静，这不代表我不重视任务。伙伴愿意陪伴、保持在场，就已经是很重要的支持；如果愿意，一句真诚的鼓励也会带来很大动力。之后，也请留给我一点个人空间去消化。" })
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "reliable",
					"data-reveal": true,
					children: ["我希望自己成为一个靠谱的人：", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "“事事有回应，件件有着落。”" })]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "ai-section",
			id: "ai",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ai-orbits",
				"aria-hidden": "true",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ai-copy",
				"data-reveal": true,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "section-no",
						children: "05 — AI & ME"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
						"是搭子，是教练，",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"也是共创伙伴。"
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "AI 是工作与学习的搭子，与我共同搭建工作系统；也是生活的教练，帮我捕捉那些尚未看清的模式。我也期待与它继续了解、合作，共创更多有趣而实用的产品。" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ai-roles",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "整理信息" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "搭建系统" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "捕捉模式" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "共同创造" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "human-note",
						children: "但最终的审美、价值判断与决策权，仍然需要交给人。"
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "now-section",
			id: "now",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "people-constellation",
				"aria-hidden": "true",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "now-copy",
				"data-reveal": true,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "section-no",
						children: "06 — NOW"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "now-label",
						children: "北辰青年线上实习 · 刚刚开始"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
						"希望与小伙伴共创，",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"也在共创中",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "看见彼此。" })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "看见彼此不同的想法、擅长与正在成长的地方，也在一次次讨论、行动和反馈中建立更深一点的链接。" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "four-weeks",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "一份能说清思考、行动与成长的作品集" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "一份更深刻的团队链接感" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "一套更清晰的 AI 工作流" })
						]
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "future-section",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "seed",
				"aria-hidden": "true",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "future-copy",
				"data-reveal": true,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "section-no",
						children: "07 — MAYBE, SOMEDAY"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "一颗还不成熟的种子。" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "也许未来，我想试着创造一个多元、包容的青年连接空间。人们可以分享真实的故事，在陪伴和反馈中获得继续行动的力量。" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "它最终会长成什么样，我还不知道。如果有机会，我想先从一次小小的相遇或共创开始。" })
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
			className: "ending",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-reveal": true,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "section-no",
						children: "TO BE CONTINUED"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "我正在继续成为自己。" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "如果你也在探索，也许我们可以交换故事，陪彼此走一段路。" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "story-link",
						onClick: () => setQrOpen(true),
						children: ["交换一段故事 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "↗" })]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "© 2026 Luu · Still becoming" })]
		}),
		qrOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "modal",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": "微信二维码",
			onMouseDown: (e) => {
				if (e.target === e.currentTarget) setQrOpen(false);
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "qr-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "close",
						onClick: () => setQrOpen(false),
						"aria-label": "关闭",
						children: "×"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "section-no",
						children: "A SMALL WINDOW"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "交换一段故事" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "如果你愿意，欢迎从一句“你好”开始。" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/images/wechat-qr.png",
						alt: "Luu 的微信二维码"
					})
				]
			})
		})
	] });
}
//#endregion
export { Home as default };
